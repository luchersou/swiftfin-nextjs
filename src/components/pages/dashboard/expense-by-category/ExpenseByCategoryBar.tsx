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
import { ChartTooltip } from "@/components/charts/ChartTooltip"
import { ExpenseByCategory } from "@/types/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Currency } from "@prisma/client"

type ExpenseByCategoryBarProps = {
  data: ExpenseByCategory[]
  currency: Currency
}

export function ExpenseByCategoryBar({
  data,
  currency,
}: ExpenseByCategoryBarProps) {
  return (
    <Card className="transition-shadow transition-colors duration-200 hover:shadow-md hover:bg-muted/90">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 16, left: 16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--chart-grid))"
              horizontal={false}
            />

            <XAxis
              type="number"
              tickFormatter={(v) => formatCurrency(v, currency)}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="categoryName"
              width={120}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={false}
              content={<ChartTooltip currency={currency} />}
            />

            <Bar
              dataKey="total"
              radius={[6, 6, 6, 6]}
              fill="hsl(var(--chart-bar))"
              barSize={38}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
