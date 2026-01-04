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
            margin={{ top: 8, right: 16, left: 24, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              className="stroke-muted"
            />

            <XAxis
              type="number"
              tickFormatter={(v) =>
                formatCurrency(v, currency)
              }
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
            />

            <YAxis
              type="category"
              dataKey="categoryName"
              width={120}
              axisLine={false}
              tickLine={false}
              className="text-xs text-muted-foreground"
            />

            <Tooltip
              cursor={false}
              content={
                <ChartTooltip currency={currency} />
              }
            />

            <Bar
              dataKey="total"
              radius={[0, 6, 6, 0]}
              fill="var(--chart-1)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
