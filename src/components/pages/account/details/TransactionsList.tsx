import { TransactionListItem } from "@/types/account";
import { AccountTransactionRow } from "./TransactionRow";
import { Currency } from "@prisma/client";
import { Receipt } from "lucide-react";

type Props = {
  transactions: TransactionListItem[];
  currency: Currency;
};

export function AccountTransactionsList({ transactions, currency }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center">
        <div className="rounded-full bg-muted p-3 sm:p-4 mb-3 sm:mb-4">
          <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
        </div>
        <p className="text-sm sm:text-base font-medium text-foreground mb-1">
          No transactions yet
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Transactions will appear here once created
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg sm:rounded-xl px-3 overflow-hidden">
      {transactions.map((transaction) => (
        <AccountTransactionRow
          key={transaction.id}
          transaction={transaction}
          currency={currency}
        />
      ))}
    </div>
  );
}