import { getUser } from "@/lib/auth/auth";
import { getDashboardSummary, getBalanceByAccountType } from "@/services/analytics"

import { BalanceByAccountTypeDonut } from "./BalanceByAccountTypeDonut"

export async function BalanceByAccountTypeServer() {
  const { userId } = await getUser();

  const [summary, balanceByAccountType] = await Promise.all([
    getDashboardSummary(userId),
    getBalanceByAccountType(userId),
  ])

  return (
    <BalanceByAccountTypeDonut
      data={balanceByAccountType}
      currency={summary.currency}
    />
  )
}
