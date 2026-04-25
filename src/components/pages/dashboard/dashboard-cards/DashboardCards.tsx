import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { DashboardSummary } from "@/types/dashboard"

export function DashboardCards({
  summary,
}: {
  summary: DashboardSummary
}) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent
          className={`text-2xl font-bold ${
            summary.totalDeposit < 0
              ? "text-destructive-foreground"
              : "text-success-foreground"
          }`}
        >
          {formatCurrency(summary.totalDeposit, summary.currency)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-success-foreground">
          {formatCurrency(summary.totalIncome, summary.currency)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Expense</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-destructive-foreground">
          {formatCurrency(summary.totalExpense, summary.currency)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Net Change</CardTitle>
        </CardHeader>
        <CardContent
          className={`text-2xl font-bold ${
            summary.netChange < 0
              ? "text-destructive-foreground"
              : "text-success-foreground"
          }`}
        >
          {formatCurrency(summary.netChange, summary.currency)}
        </CardContent>
      </Card>
    </div>
  )
}
