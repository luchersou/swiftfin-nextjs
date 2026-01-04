"use client";

import { TransactionTableRow } from "@/types/transactions";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { TableRow, TableCell } from "@/components/ui/table";
import { TransactionActions } from "@/components/pages/transactions/actions/TransactionActions";

const TRANSACTION_TYPE_CONFIG = {
  INCOME: {
    label: "Income",
    badgeVariant: "default" as const,
    textColor: "text-green-600",
    sign: "+",
  },
  EXPENSE: {
    label: "Expense",
    badgeVariant: "destructive" as const,
    textColor: "text-red-600",
    sign: "-",
  },
};

interface TransactionRowProps {
  transaction: TransactionTableRow;
  accounts: { id: string; name: string }[];
  categories?: { id: string; name: string }[];
  onSuccess?: () => void;
}

export function TransactionRow({
  transaction,
  accounts,
  categories = [],
  onSuccess,
}: TransactionRowProps) {
  const config = TRANSACTION_TYPE_CONFIG[transaction.type];

  const formattedAmount = formatCurrency(
    transaction.amount,
    transaction.account.currency
  );

  const actionsProps = {
    transaction: {
      id: transaction.id,
      amount: transaction.amount.toString(),
      description: transaction.description,
      date: transaction.date,
      type: transaction.type,
      accountId: transaction.account.id,
      categoryId: transaction.category?.id,
      notes: transaction.notes,
    },
    accounts,
    categories,
    onSuccess,
  };

  return (
    <>
      <TableRow className="sm:hidden">
        <TableCell colSpan={7} className="border-b p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {transaction.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), "dd/MM/yyyy")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className={`font-semibold ${config.textColor}`}>
                {config.sign && `${config.sign} `}
                {formattedAmount}
              </p>

              <TransactionActions {...actionsProps} />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={config.badgeVariant} className="text-xs">
              {config.label}
            </Badge>

            {transaction.category && (
              <Badge variant="outline" className="text-xs">
                {transaction.category.name}
              </Badge>
            )}

            <span className="text-xs text-muted-foreground">
              {transaction.account.name}
            </span>
          </div>
        </TableCell>
      </TableRow>

      <TableRow className="hidden sm:table-row hover:bg-muted/50 transition-colors">
        <TableCell>
          {format(new Date(transaction.date), "dd/MM/yyyy")}
        </TableCell>

        <TableCell>
          <div>
            <p className="font-medium">{transaction.description}</p>
            {transaction.notes && (
              <p className="text-sm text-muted-foreground">
                {transaction.notes}
              </p>
            )}
          </div>
        </TableCell>

        <TableCell>
          {transaction.category ? (
            <Badge variant="outline">
              {transaction.category.name}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </TableCell>

        <TableCell className="text-sm text-muted-foreground">
          {transaction.account.name}
        </TableCell>

        <TableCell>
          <Badge variant={config.badgeVariant}>
            {config.label}
          </Badge>
        </TableCell>

        <TableCell className="text-right">
          <span className={`font-semibold ${config.textColor}`}>
            {config.sign && `${config.sign} `}
            {formattedAmount}
          </span>
        </TableCell>

        <TableCell className="text-right">
          <TransactionActions {...actionsProps} />
        </TableCell>
      </TableRow>
    </>
  );
}
