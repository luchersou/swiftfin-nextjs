import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "@/lib/schemas/transactions";
import type { 
  TransactionTableRow, 
  TransactionListParams,
  TransactionByCategory,
  TransactionSummary
} from "@/types/transactions";
import { cache } from "react";
import { getUser } from "@/lib/auth/auth";

type CreateTransactionServiceInput = CreateTransactionInput & {
  userId: string;
};

export async function createTransactionService({
  userId,
  amount,
  description,
  date,
  transactionType,
  notes,
  accountId,
  categoryId,
}: CreateTransactionServiceInput) {
  await prisma.transaction.create({
    data: {
      amount: new Prisma.Decimal(amount),
      description,
      date,
      type: transactionType,
      notes,
      accountId,
      categoryId: categoryId ?? null,
      userId,
    },
  });
}

type UpdateTransactionServiceInput = UpdateTransactionInput & {
  transactionId: string;
  userId: string;
};

export async function updateTransactionService({
  transactionId,
  userId,
  ...validatedData
}: UpdateTransactionServiceInput) {
  const existingTransaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      account: {
        userId,
      },
    },
  });

  if (!existingTransaction) {
    throw new Error("Transaction not found");
  }

  if (validatedData.accountId) {
    const account = await prisma.account.findFirst({
      where: {
        id: validatedData.accountId,
        userId,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }
  }

  if (validatedData.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: validatedData.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      ...(validatedData.amount !== undefined && {
        amount: validatedData.amount,
      }),

      ...(validatedData.description !== undefined && {
        description: validatedData.description,
      }),

      ...(validatedData.date !== undefined && {
        date: validatedData.date,
      }),

      ...(validatedData.transactionType !== undefined && {
        type: validatedData.transactionType,
      }),

      ...(validatedData.accountId !== undefined && {
        accountId: validatedData.accountId,
      }),

      ...(validatedData.categoryId !== undefined && {
        categoryId: validatedData.categoryId,
      }),

      ...(validatedData.notes !== undefined && {
        notes: validatedData.notes,
      }),
    },
  });

  return updatedTransaction;
}

type DeleteTransactionServiceInput = {
  transactionId: string;
  userId: string;
};

export async function deleteTransactionService({
  transactionId,
  userId,
}: DeleteTransactionServiceInput) {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      account: {
        userId,
      },
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  });
}

export const getTransactions = async (
    userId: string,
    params: TransactionListParams
  ): Promise<{
    transactions: {
      data: TransactionTableRow[];
      pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
      };
    };
    filtersData: {
      accounts: { id: string; name: string }[];
      categories: { id: string; name: string }[];
    };
  }> => {

  const {
    page,
    pageSize,
    filters,
  } = params;

  const where = {
    userId,
    ...(filters?.accountId && { accountId: filters.accountId }),
    ...(filters?.categoryId && { categoryId: filters.categoryId }),
    ...(filters?.type && { type: filters.type }),
  };

  const [
    transactions,
    total,
    accounts,
    categories,
  ] = await Promise.all([
    prisma.transaction.findMany({
      where,
      select: {
        id: true,
        amount: true,
        date: true,
        description: true,
        notes: true,
        type: true,
        createdAt: true,
        account: {
          select: {
            id: true,
            name: true,
            currency: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        date: "desc",
      },
    }),

    prisma.transaction.count({ where }),

    prisma.account.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),

    prisma.category.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  const data: TransactionTableRow[] = transactions.map((t) => ({
    id: t.id,
    amount: Number(t.amount),
    date: t.date,
    description: t.description,
    notes: t.notes ?? undefined,
    type: t.type,
    createdAt: t.createdAt,
    account: {
      id: t.account.id,
      name: t.account.name,
      currency: t.account.currency,
    },
    category: t.category
      ? {
          id: t.category.id,
          name: t.category.name,
        }
      : null,
  }));

  return {
    transactions: {
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    },
    filtersData: {
      accounts,
      categories,
    },
  };
};

