import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { getAccountDetail } from "@/services/accounts";

import { AccountDetailsHeader } from "./AccountDetailsHeader";
import { AccountDetailsStats } from "./AccountDetailsStats";
import { AccountTransactionsList } from "./TransactionsList";

export async function AccountDetailsContent({ id }: { id: string }) {
  const account = await getAccountDetail(id);

  if (!account) {
    redirect("/dashboard/accounts");
  }

  return (
    <div className="space-y-6">
      <AccountDetailsHeader account={account} />

      <div className="text-3xl font-bold">
        {formatCurrency(account.balance, account.currency)}
      </div>

      <AccountDetailsStats
        stats={account.stats}
        currency={account.currency}
      />

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Transactions</h2>

        <AccountTransactionsList
          transactions={account.transactions}
          currency={account.currency}
        />
      </div>
    </div>
  );
}
