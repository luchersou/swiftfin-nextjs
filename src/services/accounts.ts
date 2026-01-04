import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { CreateAccountInput, UpdateAccountInput  } from "@/lib/schemas/account";
import { Decimal } from "@prisma/client/runtime/library";
import { AccountTreeNode, AccountDetail } from "@/types/account";
import { getUser } from "@/lib/auth/auth";

type CreateAccountServiceInput = CreateAccountInput & {
  userId: string;
};

export async function createAccountService({
  userId,
  name,
  accountType,
  currency,
  balance,
  isActive,
  order,
  parentId,
}: CreateAccountServiceInput) {
  await prisma.account.create({
    data: {
      name,
      type: accountType,
      currency,
      balance,
      isActive,
      order,
      parentId: parentId ?? null,
      userId,
    },
  });
}

type UpdateAccountServiceInput = UpdateAccountInput & {
  userId: string;
  accountId: string;
};

export async function updateAccountService({
  accountId,
  userId,
  name,
  currency,
  isActive,
  order,
  parentId,
}: UpdateAccountServiceInput) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
    },
    select: { id: true },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  await prisma.account.update({
    where: { id: accountId },
    data: {
      name,
      currency,
      isActive,
      order,
      parentId,
    },
  });
}

type DeleteAccountServiceInput = {
  accountId: string;
  userId: string;
};

export async function deleteAccountService({
  accountId,
  userId,
}: DeleteAccountServiceInput) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
    },
    include: {
      children: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  if (account.children.length > 0) {
    throw new Error("Cannot delete account with sub-accounts");
  }

  await prisma.account.delete({
    where: { id: accountId },
  });
}

export const getAccountsCount = cache(async () => {
  const user = await getUser()

  return prisma.account.count({
    where: {
      userId: user.userId,
    },
  })
})

export const getAccountTree = cache(
  async (): Promise<AccountTreeNode[]> => {
    const { userId } = await getUser();

    const accounts = await prisma.account.findMany({
      where: {
        userId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        type: true,
        currency: true,
        balance: true,
        parentId: true,
      },
      orderBy: [{ order: "desc" }, { name: "asc" }],
    });

    const transactions = await prisma.transaction.groupBy({
      by: ["accountId", "type"],
      where: { userId },
      _sum: { amount: true },
    });

    const balanceMap = new Map<string, Decimal>();

    for (const account of accounts) {
      balanceMap.set(account.id, new Decimal(account.balance));
    }

    for (const t of transactions) {
      if (!t.accountId) continue;

      const current = balanceMap.get(t.accountId) ?? new Decimal(0);
      const amount = new Decimal(t._sum.amount ?? 0);

      balanceMap.set(
        t.accountId,
        t.type === "INCOME"
          ? current.plus(amount)
          : current.minus(amount)
      );
    }

    const nodeMap = new Map<string, AccountTreeNode>();

    for (const account of accounts) {
      nodeMap.set(account.id, {
        id: account.id,
        name: account.name,
        type: account.type,
        currency: account.currency,
        balance: balanceMap.get(account.id)?.toNumber() ?? 0,
        parentId: account.parentId,
        children: [],
      });
    }

    const roots: AccountTreeNode[] = [];

    for (const account of accounts) {
      const node = nodeMap.get(account.id)!;

      if (account.parentId) {
        nodeMap.get(account.parentId)?.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
);

export const getAccountDetail = cache(
  async (accountId: string): Promise<AccountDetail | null> => {
    const { userId } = await getUser();

    const account = await prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        currency: true,
        balance: true,
        isActive: true,
      },
    });

    if (!account) return null;

    const transactions = await prisma.transaction.findMany({
      where: {
        accountId,
        userId,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        type: true,
        date: true,
        category: {
          select: { name: true },
        },
      },
      orderBy: { date: "desc" },
    });

    const grouped = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        accountId,
        userId,
      },
      _sum: { amount: true },
    });

    const totalIncome = new Decimal(
      grouped.find(g => g.type === "INCOME")?._sum.amount ?? 0
    );

    const totalExpense = new Decimal(
      grouped.find(g => g.type === "EXPENSE")?._sum.amount ?? 0
    );

    const finalBalance = new Decimal(account.balance)
      .plus(totalIncome)
      .minus(totalExpense)
      .toNumber();

    return {
      id: account.id,
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: finalBalance,
      isActive: account.isActive,

      stats: {
        initialBalance: account.balance.toNumber(),
        totalIncome: totalIncome.toNumber(),
        totalExpense: totalExpense.toNumber(),
        transactionCount: transactions.length,
      },

      transactions: transactions.map(t => ({
        id: t.id,
        description: t.description,
        amount: t.amount.toNumber(),
        type: t.type,
        date: t.date,
        category: t.category?.name,
      })),
    };
  }
);