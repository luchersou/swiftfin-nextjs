"use client";

import { AccountTreeNode } from "@/types/account";
import { AccountRow } from "./AccountListRow";

type AccountTreeProps = {
  accounts: AccountTreeNode[];
};

export function AccountTree({ accounts }: AccountTreeProps) {
  if (accounts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        No accounts created yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {accounts.map((account) => (
        <AccountRow
          key={account.id}
          account={account}
          level={1}
        />
      ))}
    </div>
  );
}
