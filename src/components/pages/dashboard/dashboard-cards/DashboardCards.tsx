import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSummary } from "@/types/dashboard"
import { formatCurrency } from "@/lib/utils"

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
              ? "text-rose-600"
              : "text-emerald-600"
          }`}
        >
          {formatCurrency(summary.totalDeposit, summary.currency)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-emerald-600">
          {formatCurrency(summary.totalIncome, summary.currency)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Expense</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-rose-600">
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
              ? "text-rose-600"
              : "text-emerald-600"
          }`}
        >
          {formatCurrency(summary.netChange, summary.currency)}
        </CardContent>
      </Card>
    </div>
  )
}
