"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IncomeVsExpense } from "@/types/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Currency } from "@prisma/client"
import { ChartTooltip } from "@/components/charts/ChartTooltip"

type IncomeVsExpenseBarProps = {
  data: IncomeVsExpense
  currency: Currency
}

export function IncomeVsExpenseBar({
  data,
  currency,
}: IncomeVsExpenseBarProps) {
  const chartData = [
    { label: "Income", value: data.income, type: "income" },
    { label: "Expense", value: data.expense, type: "expense" },
  ]

  return (
    <Card className="transition-shadow transition-colors duration-200 hover:shadow-md hover:bg-muted/90">
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={48}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(v: number) =>
                formatCurrency(v, currency)
              }
              axisLine={false}
              tickLine={false}
              width={80}
            />

            <Tooltip
              cursor={false}
              content={
                <ChartTooltip currency={currency} />
              }
            />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.label}
                  className={
                    entry.type === "income"
                      ? "fill-[var(--chart-income)]"
                      : "fill-[var(--chart-expense)]"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
