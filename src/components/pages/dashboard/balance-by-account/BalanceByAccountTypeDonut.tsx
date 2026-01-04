"use client"

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BalanceByAccountType } from "@/types/dashboard"
import { Currency } from "@prisma/client"
import { ChartTooltip } from "@/components/charts/ChartTooltip"
import { formatCurrency } from "@/lib/utils"

type BalanceByAccountTypeDonutProps = {
  data: BalanceByAccountType[]
  currency: Currency
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
]

export function BalanceByAccountTypeDonut({
  data,
  currency,
}: BalanceByAccountTypeDonutProps) {
  const colorMap = new Map<string, string>()
  data.forEach((item, index) => {
    colorMap.set(item.type, COLORS[index % COLORS.length])
  })

  const positiveData = data.filter((item) => item.total > 0)

  return (
    <Card className="transition-shadow transition-colors duration-200 hover:shadow-md hover:bg-muted/90">
      <CardHeader>
        <CardTitle>Balance by Account Type</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={positiveData}
                dataKey="total"
                nameKey="type"
                innerRadius={50}
                outerRadius={100}
              >
                {positiveData.map((item) => (
                  <Cell
                    key={item.type}
                    fill={colorMap.get(item.type)}  
                  />
                ))}
              </Pie>

              <Tooltip
                cursor={false}
                content={
                  <ChartTooltip currency={currency} />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: colorMap.get(item.type),  
                  }}
                />

                <span className="text-muted-foreground">
                  {item.type}
                </span>
              </div>

              <span className={`font-medium ${item.total < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {formatCurrency(item.total, currency)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}