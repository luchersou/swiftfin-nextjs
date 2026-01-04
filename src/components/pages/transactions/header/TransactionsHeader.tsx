import { Breadcrumbs } from "@/components/ui/breadcrumb";

type TransactionsHeaderProps = {
  total: number;
};

export function TransactionsHeader({
  total,
}: TransactionsHeaderProps) {

  return (
    <>
    <div className="pb-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Accounts" }
          ]}
        />
      </div>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Transactions
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {total} {total === 1 ? "Transaction" : "Transactions"}
        </p>
      </div>
    </div>
    </>
  );
}
