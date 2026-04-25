import { getUser } from "@/lib/auth/auth";
import {
  getDashboardSummary,
  getIncomeVsExpense,
} from "@/services/analytics"

import { IncomeVsExpenseBar } from "./IncomeVsExpenseBar"


export async function IncomeVsExpenseServer() {
  const { userId } = await getUser();

  const [summary, incomeVsExpense] = await Promise.all([
    getDashboardSummary(userId),
    getIncomeVsExpense(userId),
  ])

  return (
    <IncomeVsExpenseBar
      data={incomeVsExpense}
      currency={summary.currency}
    />
  )
}
