"use client"

import { formatCurrency } from "@/lib/utils"
import { Currency } from "@prisma/client"

type ChartTooltipProps = {
  active?: boolean
  payload?: any[]
  label?: string
  currency: Currency
}

export function ChartTooltip({
  active,
  payload,
  label,
  currency,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  const item = payload[0]

  const name =
    label ??
    item.name ??
    item.payload?.label ??
    item.payload?.name ??
    item.payload?.type ??
    "—"

  const value = item.value

  return (
    <div className="rounded-lg border bg-[hsl(var(--chart-tooltip-bg))] px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">
        {name}
      </p>

      <p className="text-sm font-semibold text-[hsl(var(--chart-tooltip-text))]">
        {formatCurrency(value, currency)}
      </p>
    </div>
  )
}
