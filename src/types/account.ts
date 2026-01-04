import { AccountType, Currency, TransactionType } from "@prisma/client";

export type AccountTreeNode = {
  id: string;
  name: string;

  type: AccountType;
  currency: Currency;

  balance: number;
  parentId: string | null;
  children: AccountTreeNode[];
};

export type AccountDetail = {
  id: string;
  name: string;

  type: AccountType;
  currency: Currency;

  balance: number;
  isActive: boolean;

  stats: AccountStats;

  transactions: TransactionListItem[];
};

export type AccountStats = {
  totalIncome: number;
  totalExpense: number;
  transactionCount: number;
  initialBalance: number;
};

export type TransactionListItem = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
  category?: string;
};

