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

  const resolveName = (item: any) =>
    label ??
    item.payload?.label ??
    item.payload?.name ??
    item.payload?.type ??
    item.name ??
    "—"

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md min-w-[120px]">
      {payload.map((item, i) => (
        <div key={i} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full shrink-0"
              style={{ background: item.color ?? item.fill }}
            />
            <p className="text-xs text-muted-foreground">
              {resolveName(item)}
            </p>
          </div>
          <p className="text-xs font-semibold text-popover-foreground tabular-nums">
            {formatCurrency(item.value, currency)}
          </p>
        </div>
      ))}
    </div>
  )
}