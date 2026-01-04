import { Suspense } from "react"

import { CardSkeleton } from "@/components/skeletons/CardSkeleton"
import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton"

import { DashboardCardsServer } from "@/components/pages/dashboard/dashboard-cards/DashboardCards.server"
import { IncomeVsExpenseServer } from "@/components/pages/dashboard/income-vs-expense/IncomeVsExpense.server"
import { ExpenseByCategoryServer } from "@/components/pages/dashboard/expense-by-category/ExpenseByCategory.server"
import { BalanceByAccountTypeServer } from "@/components/pages/dashboard/balance-by-account/BalanceByAccount.server"
import { BalanceByAccountServer } from "@/components/pages/dashboard/balance-by-account-type/BalanceByAccountType.server"

import { getAccountsCount } from "@/services/accounts"

export default async function DashboardPage() {
  const accountsCount = await getAccountsCount()

  return (
    <div className="space-y-10">
      <Suspense fallback={<CardSkeleton />}>
        <DashboardCardsServer />
      </Suspense>

      {accountsCount === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">
            No accounts yet
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Create your first account to see insights and charts.
          </p>
        </div>
      ) : (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <Suspense fallback={<ChartSkeleton />}>
              <IncomeVsExpenseServer />
            </Suspense>

            <Suspense fallback={<ChartSkeleton />}>
              <BalanceByAccountServer />
            </Suspense>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Suspense fallback={<ChartSkeleton />}>
              <BalanceByAccountTypeServer />
            </Suspense>

            <Suspense fallback={<ChartSkeleton />}>
              <ExpenseByCategoryServer />
            </Suspense>
          </section>
        </>
      )}
    </div>
  )
}