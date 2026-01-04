"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BalanceByAccount } from "@/types/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Currency } from "@prisma/client"
import { ChartTooltip } from "@/components/charts/ChartTooltip"

type BalanceByAccountChartProps = {
  data: BalanceByAccount[]
  currency: Currency
}

export function BalanceByAccountChart({
  data,
  currency,
}: BalanceByAccountChartProps) {
  return (
    <Card className="transition-shadow transition-colors duration-200 hover:shadow-md hover:bg-muted/90">
      <CardHeader>
        <CardTitle>Your Top Accounts</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px] ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 16, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--chart-grid))"
              vertical={false}
            />

            <XAxis
              dataKey="accountName"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(v) => formatCurrency(Number(v), currency)}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={false}
              content={
                <ChartTooltip currency={currency} />
              }
            />

            <Bar
              dataKey="balance"
              radius={[6, 6, 0, 0]}
              fill="hsl(var(--chart-bar))"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
