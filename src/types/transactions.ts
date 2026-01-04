import { TransactionType, Currency } from "@prisma/client";

export type TransactionTableRow = {
  id: string;

  amount: number;
  date: Date;

  description: string;
  notes?: string;

  type: TransactionType;

  account: {
    id: string;
    name: string;
    currency: Currency;
  };

  category: {
    id: string;
    name: string;
  } | null; 

  createdAt: Date;
};

export type TransactionFilters = {
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;
};

export type TransactionListParams = {
  page: number;
  pageSize: number;
  filters?: TransactionFilters;
};

export type TransactionByCategory = {
  categoryId: string;
  categoryName: string;
  total: number;
};

export type TransactionSummary = {
  totalIncome: number;
  totalExpense: number;
  netChange: number;
};

