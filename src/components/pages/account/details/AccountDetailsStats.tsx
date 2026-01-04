import { AccountStats } from "@/types/account";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Currency } from "@prisma/client";
import { TrendingUp, TrendingDown, Receipt, DollarSign } from "lucide-react";

type Props = {
  stats: AccountStats;
  currency: Currency;
};

export function AccountDetailsStats({ stats, currency }: Props) {
  const statsData = [
    {
      label: "Initial Balance",
      value: formatCurrency(stats.initialBalance, currency),
      icon: DollarSign,
      colorClass: "text-primary"
    },
    {
      label: "Total Income",
      value: formatCurrency(stats.totalIncome, currency),
      icon: TrendingUp,
      colorClass: "text-success"
    },
    {
      label: "Total Expense",
      value: formatCurrency(stats.totalExpense, currency),
      icon: TrendingDown,
      colorClass: "text-destructive"
    },
    {
      label: "Transactions",
      value: stats.transactionCount.toLocaleString(),
      icon: Receipt,
      colorClass: "text-muted-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
                  {stat.label}
                </p>
                <div className="shrink-0">
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.colorClass}`} />
                </div>
              </div>
              
              <p className={`text-base sm:text-lg lg:text-xl font-bold ${stat.colorClass} tabular-nums break-words`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}