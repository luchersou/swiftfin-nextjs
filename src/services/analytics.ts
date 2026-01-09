import { prisma } from "@/lib/prisma";
import { TransactionType, Currency, AccountType } from "@prisma/client";
import { convertCurrency } from "./currency";
import type { 
    DashboardSummary, 
    ExpenseByCategory, 
    IncomeVsExpense, 
    BalanceByAccountType, 
    BalanceByAccount, 
} from "@/types/dashboard";

const TOP_ACCOUNTS_LIMIT = 3;

export async function getDashboardSummary( userId: string): Promise<DashboardSummary> {
  const baseCurrency = Currency.USD;

  const accounts = await prisma.account.findMany({
    where: {
      isActive: true,
      userId,
    },
    select: {
      balance: true,
      currency: true,
      transactions: {
        select: {
          type: true,
          amount: true,
        },
      },
    },
  });

  if (accounts.length === 0) {
    return {
      totalIncome: 0,
      totalExpense: 0,
      netChange: 0,
      totalDeposit: 0,
      currency: baseCurrency,
    };
  }

  let totalIncome = 0;
  let totalExpense = 0;
  let totalBalance = 0;

  for (const account of accounts) {
    const convertedBalance = await convertCurrency(
      account.balance.toNumber(),
      account.currency,
      baseCurrency
    );

    totalBalance += convertedBalance;

    for (const transaction of account.transactions) {
      const convertedAmount = await convertCurrency(
        transaction.amount.toNumber(),
        account.currency,
        baseCurrency
      );

      if (transaction.type === TransactionType.INCOME) {
        totalIncome += convertedAmount;
      } else {
        totalExpense += convertedAmount;
      }
    }
  }

  return {
    totalIncome,
    totalExpense,
    netChange: totalIncome - totalExpense,
    totalDeposit: totalBalance + (totalIncome - totalExpense),
    currency: baseCurrency,
  };
}

export async function getExpenseByCategory(
  userId: string
): Promise<ExpenseByCategory[]> {
  const baseCurrency = Currency.USD;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      type: TransactionType.EXPENSE,
    },
    select: {
      categoryId: true,
      amount: true,
      account: {
        select: {
          currency: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (transactions.length === 0) {
    return [];
  }

  const categoryTotals = new Map<
    string,
    { name: string; total: number }
  >();

  for (const transaction of transactions) {
    const categoryKey = transaction.categoryId ?? "UNCATEGORIZED";
    const categoryName = transaction.category?.name ?? "--";

    const convertedAmount = await convertCurrency(
      transaction.amount.toNumber(),
      transaction.account.currency,
      baseCurrency
    );

    const current = categoryTotals.get(categoryKey);

    if (current) {
      current.total += convertedAmount;
    } else {
      categoryTotals.set(categoryKey, {
        name: categoryName,
        total: convertedAmount,
      });
    }
  }

  return Array.from(categoryTotals.entries())
    .map(([categoryId, data]) => ({
      categoryId,
      categoryName: data.name,
      total: data.total,
    }))
    .sort((a, b) => b.total - a.total);
}


export async function getIncomeVsExpense(
  userId: string
): Promise<IncomeVsExpense> {

  const baseCurrency = Currency.USD;

  const accounts = await prisma.account.findMany({
    where: {
      userId,
      isActive: true,
    },
    select: {
      currency: true,
      transactions: {
        select: {
          type: true,
          amount: true,
        },
      },
    },
  });

  let income = 0;
  let expense = 0;

  for (const account of accounts) {
    for (const transaction of account.transactions) {
      const convertedAmount = await convertCurrency(
        transaction.amount.toNumber(),
        account.currency,
        baseCurrency
      );

      if (transaction.type === TransactionType.INCOME) {
        income += convertedAmount;
      } else if (transaction.type === TransactionType.EXPENSE) {
        expense += convertedAmount;
      }
    }
  }

  return { income, expense };
}

export async function getBalanceByAccountType(
  userId: string
): Promise<BalanceByAccountType[]> {
  const baseCurrency = Currency.USD;

  const accounts = await prisma.account.findMany({
    where: {
      userId,
      isActive: true,
    },
    select: {
      type: true,
      balance: true,
      currency: true,
      transactions: {
        select: {
          type: true,
          amount: true,
        },
      },
    },
  });

  const totals = new Map<string, number>();

  for (const account of accounts) {
    const convertedBalance = await convertCurrency(
      account.balance.toNumber(),
      account.currency,
      baseCurrency
    );

    let transactionsTotal = 0;
    for (const transaction of account.transactions) {
      const convertedAmount = await convertCurrency(
        transaction.amount.toNumber(),
        account.currency,
        baseCurrency
      );

      if (transaction.type === TransactionType.EXPENSE) {
        transactionsTotal -= convertedAmount;
      } else if (transaction.type === TransactionType.INCOME) {
        transactionsTotal += convertedAmount;
      }
    }

    const accountTotal = convertedBalance + transactionsTotal;

    totals.set(
      account.type,
      (totals.get(account.type) ?? 0) + accountTotal
    );
  }

  return Array.from(totals.entries()).map(([type, total]) => ({
    type: type as AccountType,
    total,
  }));
}

export async function getBalanceByAccount(
  userId: string,
  limit = TOP_ACCOUNTS_LIMIT
): Promise<BalanceByAccount[]> {
  const baseCurrency = Currency.USD;

  const accounts = await prisma.account.findMany({
    where: {
      userId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      balance: true,
      currency: true, 
      transactions: {
        select: {
          type: true,
          amount: true,
        },
      },
    },
  });

  const accountsWithBalance = await Promise.all(
    accounts.map(async (account) => {
      const convertedBalance = await convertCurrency(
        account.balance.toNumber(),
        account.currency,
        baseCurrency
      );

      let transactionsTotal = 0;
      for (const transaction of account.transactions) {
        const convertedAmount = await convertCurrency(
          transaction.amount.toNumber(),
          account.currency,
          baseCurrency
        );

        if (transaction.type === TransactionType.EXPENSE) {
          transactionsTotal -= convertedAmount;
        } else if (transaction.type === TransactionType.INCOME) {
          transactionsTotal += convertedAmount;
        }
      }

      return {
        accountId: account.id,
        accountName: account.name,
        balance: convertedBalance + transactionsTotal,
      };
    })
  );

  return accountsWithBalance
    .sort((a, b) => b.balance - a.balance)
    .slice(0, limit);
}
