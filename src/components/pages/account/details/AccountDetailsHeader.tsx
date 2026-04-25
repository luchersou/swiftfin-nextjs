import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { AccountDetail } from "@/types/account";

export function AccountDetailsHeader({ account }: { account: AccountDetail }) {
  return (
    <div className="space-y-2">
      <div className="pb-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Accounts", href: "/dashboard/accounts" },
          { label: account.name },
        ]}
      />
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">{account.name}</h1>

        {!account.isActive && (
          <Badge variant="secondary">Inactive</Badge>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {account.type} · {account.currency}
      </p>
    </div>
  );
}
