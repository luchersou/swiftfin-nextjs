"use client";

import { TransactionTableRow } from "@/types/transactions";
import { TransactionRow } from "./TransactionsRow";
import { TransactionsPagination } from "./TransactionsPagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TransactionsTableProps = {
  data: TransactionTableRow[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  accounts: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
  onSuccess?: () => void;
};

export function TransactionsTable({
  data,
  page,
  pageSize,
  totalPages,
  totalCount,
  accounts,
  categories = [],
  onSuccess,
}: TransactionsTableProps) {
  return (
    <div className="space-y-4">
      <div className="sm:hidden rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableBody>
            {data.length ? (
              data.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  accounts={accounts}
                  categories={categories}
                  onSuccess={onSuccess}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="p-8 text-center text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="hidden sm:block rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length ? (
              data.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  accounts={accounts}
                  categories={categories}
                  onSuccess={onSuccess}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TransactionsPagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </div>
  );
}
