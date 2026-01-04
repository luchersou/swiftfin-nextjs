import { TransactionListItem } from "@/types/account";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Currency } from "@prisma/client";

type Props = {
  transaction: TransactionListItem;
  currency: Currency;
};

const TRANSACTION_CONFIG = {
  INCOME: {
    label: "Income",
    color: "text-green-600",
    sign: "+",
  },
  EXPENSE: {
    label: "Expense",
    color: "text-red-600",
    sign: "-",
  },
} as const;

export function AccountTransactionRow({ transaction, currency }: Props) {
  const config = TRANSACTION_CONFIG[transaction.type];

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="space-y-1">
        <p className="font-medium">{transaction.description}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{format(new Date(transaction.date), "dd/MM/yyyy")}</span>

          {transaction.category && (
            <>
              <span>•</span>
              <span>{transaction.category}</span>
            </>
          )}
        </div>
      </div>

      <div className="text-right space-y-1">
        <Badge variant="outline">{config.label}</Badge>

        <p className={`font-semibold ${config.color}`}>
          {config.sign}{" "}
          {formatCurrency(transaction.amount, currency)}
        </p>
      </div>
    </div>
  );
}
