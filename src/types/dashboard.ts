import { AccountType, Currency } from "@prisma/client";

export type DashboardSummary = {
  totalIncome: number;
  totalExpense: number;
  netChange: number;
  totalDeposit: number
  currency: Currency;
};

export type ExpenseByCategory = {
  categoryId: string;
  categoryName: string;
  total: number;
};

export type IncomeVsExpense = {
  income: number;
  expense: number;
};

export type BalanceByAccountType = {
  type: AccountType;
  total: number;
};

export type BalanceByAccount = {
  accountId: string;
  accountName: string;
  balance: number;
};

export type ExpenseIncomeRatio = {
  ratio: number;
};

export type TransactionCountSummary = {
  total: number;
  incomeCount: number;
  expenseCount: number;
};
