import {
  getDashboardSummary,
  getBalanceByAccount,
} from "@/services/analytics"
import { getUser } from "@/lib/auth/auth";

import { BalanceByAccountChart } from "./BalanceByAccountTypeChart"

export async function BalanceByAccountServer() {
  const { userId } = await getUser();

  const [summary, balanceByAccount] = await Promise.all([
    getDashboardSummary(userId),
    getBalanceByAccount(userId),
  ])

  return (
    <BalanceByAccountChart
      data={balanceByAccount}
      currency={summary.currency}
    />
  )
}
