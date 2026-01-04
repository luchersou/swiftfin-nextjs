import {
  getDashboardSummary,
  getExpenseByCategory,
} from "@/services/analytics"
import { getUser } from "@/lib/auth/auth";

import { ExpenseByCategoryBar } from "./ExpenseByCategoryBar"

export async function ExpenseByCategoryServer() {
  const { userId } = await getUser();

  const [summary, expenseByCategory] = await Promise.all([
    getDashboardSummary(userId),
    getExpenseByCategory(userId),
  ])

  return (
    <ExpenseByCategoryBar
      data={expenseByCategory}
      currency={summary.currency}
    />
  )
}
