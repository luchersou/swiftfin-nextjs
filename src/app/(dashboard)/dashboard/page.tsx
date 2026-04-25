import { Suspense } from "react"

import { CardSkeleton } from "@/components/skeletons/CardSkeleton"
import { ChartSkeleton } from "@/components/skeletons/ChartSkeleton"

import { DashboardCardsServer } from "@/components/pages/dashboard/dashboard-cards/DashboardCards.server"
import { DashboardChartsServer } from "@/components/pages/dashboard/dashboard-charts/DashboardCharts.server"

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<CardSkeleton />}>
        <DashboardCardsServer />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <DashboardChartsServer />
      </Suspense>
    </div>
  )
}