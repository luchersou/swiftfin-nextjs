"use client";

import { AccountTreeNode } from "@/types/account";
import { cn, formatCurrency } from "@/lib/utils";
import { AccountActions } from "./AccountListActions";
import { ChevronRight, Wallet } from "lucide-react";
import Link from "next/link";

type AccountRowProps = {
  account: AccountTreeNode;
  level: number;
};

export function AccountRow({ account, level }: AccountRowProps) {
  const isParent = account.children.length > 0;
  const isChild = level > 0;

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4",
          "rounded-lg border px-4 py-3 sm:px-5 sm:py-4",
          "account-card-transition",
          "hover:shadow-md hover:scale-[1.01]",
          isChild 
            ? "bg-[hsl(var(--account-child-bg))] border-l-[3px] border-l-primary/70 shadow-sm" 
            : "bg-[hsl(var(--account-parent-bg))] border-[hsl(var(--account-parent-border))] shadow-sm hover:shadow-lg",
          !isChild && "hover:border-primary/30"
        )}
        style={{ 
          marginLeft: level * (isChild ? 24 : 0),
        }}
      >
        <Link 
            href={`/dashboard/accounts/${account.id}`}
            className="relative flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
        >
        <div className="relative flex items-center gap-3 min-w-0 flex-1">
          {!isChild && (
            <div className={cn(
              "flex items-center justify-center rounded-lg p-2",
              "bg-primary/10 text-primary shrink-0"
            )}>
              <Wallet className="h-4 w-4" />
            </div>
          )}

          {isChild && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
          )}
          
          <div className="min-w-0 flex-1">
            <p className={cn(
              "truncate",
              isParent ? "text-base font-bold" : "text-sm font-semibold",
              "text-foreground"
            )}>
              {account.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                "bg-secondary/50 text-secondary-foreground"
              )}>
                {account.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {account.currency}
              </span>
            </div>
          </div>
        </div>
        </Link>

        <div className="relative flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
          <div className="text-right">
            <span className={cn(
              "block tabular-nums",
              isParent ? "text-lg" : "text-base",
              account.balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}>
              {formatCurrency(account.balance, account.currency)}
            </span>
            {isParent && account.children.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {account.children.length} {account.children.length === 1 ? 'account' : 'accounts'}
              </span>
            )}
          </div>
          
          <AccountActions account={account} />
        </div>
      </div>

      {account.children.length > 0 && (
        <div className="space-y-2">
          {account.children.map((child) => (
            <AccountRow
              key={child.id}
              account={child}
              level={level + 2}
            />
          ))}
        </div>
      )}
    </div>
  );
}