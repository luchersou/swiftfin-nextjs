import { Suspense } from "react"

import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton"

import { IncomeVsExpenseServer } from "@/components/pages/dashboard/income-vs-expense/IncomeVsExpense.server"
import { ExpenseByCategoryServer } from "@/components/pages/dashboard/expense-by-category/ExpenseByCategory.server"
import { BalanceByAccountTypeServer } from "@/components/pages/dashboard/balance-by-account/BalanceByAccount.server"
import { BalanceByAccountServer } from "@/components/pages/dashboard/balance-by-account-type/BalanceByAccountType.server"

import { getAccountsCount } from "@/services/accounts"
import { getTransactionsMetadata } from "@/services/transactions"

export async function DashboardChartsServer() {
  const [accountsCount, { totalTransactions, categorizedExpenses }] = await Promise.all([
    getAccountsCount(),
    getTransactionsMetadata(),
  ])

  if (accountsCount === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <h2 className="text-lg font-semibold">No accounts yet</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first account to see insights and charts.
        </p>
      </div>
    )
  }

  const hasTransactions = totalTransactions > 0
  const hasCategorizedExpenses = categorizedExpenses > 0

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <BalanceByAccountTypeServer />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <BalanceByAccountServer />
        </Suspense>
      </section>

      {hasTransactions && (
        <section className="grid gap-6 lg:grid-cols-2">
          <Suspense fallback={<ChartSkeleton />}>
            <IncomeVsExpenseServer />
          </Suspense>

          {hasCategorizedExpenses && (
            <Suspense fallback={<ChartSkeleton />}>
              <ExpenseByCategoryServer />
            </Suspense>
          )}
        </section>
      )}
    </div>
  )
}