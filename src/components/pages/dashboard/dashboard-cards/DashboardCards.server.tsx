import { getDashboardSummary } from "@/services/analytics"
import { DashboardCards } from "./DashboardCards"
import { getUser } from "@/lib/auth/auth";

export async function DashboardCardsServer() {
  const { userId } = await getUser();

  const summary = await getDashboardSummary(userId)

  return <DashboardCards summary={summary} />
}
