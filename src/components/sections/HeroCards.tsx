"use client";

import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import {
  BarChart3,
  PieChart,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ArrowDownLeft,
  Monitor,
  Cloud,
  Sparkles,
} from "lucide-react";

interface HeroCardsProps {
  className?: string;
}

export function HeroCards({ className }: HeroCardsProps) {
  return (
    <div className={cn(
      "relative w-full max-w-[350px] lg:max-w-[420px] xl:max-w-[480px] aspect-square flex-shrink-0",
      className
    )}>
      <RevenueCard />
      <TransactionsCard />
      <InsightsCard />
    </div>
  );
}

function RevenueCard() {
  const bars = [45, 65, 35, 85, 55, 75, 95];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotate: -12 }}
      animate={{ opacity: 1, x: 0, rotate: -6 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="absolute left-0 top-[15%] rotate-[-6deg] z-30 hover:z-50 transition-all hover:scale-105"
    >
      <CardContainer>
        <CardBody className="feature-card w-[322px]">
          <CardItem translateZ="50">
            <WindowBar url="app.finance-x.io/analytics" />
          </CardItem>

          <div className="flex h-full">
            {/* Sidebar */}
            <CardItem translateZ="70">
              <div className="w-11 py-5 border-r border-slate-700/30 flex flex-col items-center gap-5 bg-slate-950/40 h-full">
                <div className="p-1.5 rounded-md bg-blue-500/20">
                  <LayoutDashboard size={15} className="text-blue-400" />
                </div>
                <BarChart3 size={15} className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer" />
                <Users size={15} className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer" />
                <Settings size={15} className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer" />
              </div>
            </CardItem>

            {/* Main content */}
            <CardItem translateZ="100" className="p-4 w-full flex flex-col gap-4">

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Revenue</p>
                  <h3 className="text-lg font-bold text-white leading-tight">$47,500</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ArrowUpRight size={11} className="text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-semibold">+12.5%</span>
                    <span className="text-[10px] text-slate-600">vs last week</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-600 bg-slate-800/60 px-2 py-1 rounded-full">Last 7 days</span>
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-end gap-1.5 h-24 bg-slate-950/40 rounded-xl p-2.5 border border-slate-700/20">
                  {bars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t opacity-80 hover:opacity-100 hover:from-blue-500 hover:to-cyan-400 transition-all cursor-pointer"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-1">
                  {days.map((day, i) => (
                    <span key={i} className="text-[9px] text-slate-600 flex-1 text-center">{day}</span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950/40 rounded-lg p-2.5 border border-slate-700/20">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider">Highest</p>
                  <p className="text-sm font-bold text-white mt-0.5">$9,200</p>
                  <p className="text-[9px] text-slate-600">Sunday</p>
                </div>
                <div className="bg-slate-950/40 rounded-lg p-2.5 border border-slate-700/20">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider">Average</p>
                  <p className="text-sm font-bold text-white mt-0.5">$6,785</p>
                  <p className="text-[9px] text-slate-600">per day</p>
                </div>
              </div>

              {/* Trend line */}
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                <TrendingUp size={13} className="text-emerald-400 shrink-0" />
                <p className="text-[10px] text-emerald-300">
                  Revenue trending <span className="font-semibold">up 3 weeks</span> in a row
                </p>
              </div>

            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

function TransactionsCard() {
  const transactions = [
    { name: "Client Payment", amount: 2840.00, time: "2:34 PM", category: "Income", icon: ArrowDownLeft },
    { name: "Software License", amount: -129.99, time: "1:15 PM", category: "Software", icon: Monitor },
    { name: "Consulting Fee", amount: 450.00, time: "12:01 PM", category: "Income", icon: ArrowDownLeft },
    { name: "Cloud Services", amount: -89.00, time: "10:23 AM", category: "Infrastructure", icon: Cloud },
  ];

  const totalIn = transactions.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const totalOut = transactions.filter(t => t.amount < 0).reduce((a, t) => a + Math.abs(t.amount), 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotate: 8 }}
      animate={{ opacity: 1, x: 0, rotate: 4 }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      className="absolute right-[-5%] top-[25%] rotate-[6deg] z-20 hover:z-50 transition-all hover:scale-105"
    >
      <CardContainer>
        <CardBody className="feature-card w-[322px]">
          <CardItem translateZ="50">
            <WindowBar url="app.finance-x.io/payments" />
          </CardItem>

          <CardItem translateZ="90" className="p-4 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-xl">
                  <CreditCard size={14} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Transactions</h3>
                  <p className="text-[10px] text-slate-500">Today's activity</p>
                </div>
              </div>
              <span className="text-[9px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-full font-medium">
                {transactions.length} items
              </span>
            </div>

            {/* In / Out summary */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5">
                <p className="text-[9px] text-emerald-500 uppercase tracking-wider font-medium">Money In</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">+${totalIn.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2.5">
                <p className="text-[9px] text-red-400 uppercase tracking-wider font-medium">Money Out</p>
                <p className="text-sm font-bold text-red-400 mt-0.5">-${totalOut.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            {/* Transaction list */}
            <div className="space-y-1.5">
              {transactions.map((tx, i) => {
                const Icon = tx.icon;
                const isPositive = tx.amount > 0;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between px-2.5 py-2 bg-slate-950/40 border border-slate-700/20 rounded-xl hover:bg-slate-800/40 hover:border-slate-600/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isPositive ? "bg-emerald-500/15" : "bg-slate-700/40"}`}>
                        <Icon size={11} className={isPositive ? "text-emerald-400" : "text-slate-500"} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-white leading-tight">{tx.name}</p>
                        <p className="text-[9px] text-slate-600">{tx.category} · {tx.time}</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold tabular-nums ${isPositive ? "text-emerald-400" : "text-slate-400"}`}>
                      {isPositive ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Balance footer */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-700/30">
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider">Total Balance</p>
                <p className="text-base font-bold text-white mt-0.5">$18,447.19</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-full">
                <TrendingUp size={11} />
                <span className="text-[10px] font-semibold">+8.2%</span>
              </div>
            </div>

          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

function InsightsCard() {
  const stats = [
    { label: "Revenue", value: "$24.8K", change: "+8.2%", up: true },
    { label: "Clients", value: "143", change: "+12%", up: true },
    { label: "Expenses", value: "$8.2K", change: "-2.1%", up: false },
    { label: "Profit", value: "$16.6K", change: "+15%", up: true },
  ];

  const categories = [
    { name: "Consulting", percent: 52, color: "bg-blue-400", glow: "shadow-blue-500/40" },
    { name: "Products", percent: 31, color: "bg-purple-400", glow: "shadow-purple-500/40" },
    { name: "Services", percent: 17, color: "bg-cyan-400", glow: "shadow-cyan-500/40" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotate: -6 }}
      animate={{ opacity: 1, x: 0, rotate: -3 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="absolute left-[25%] bottom-[-5%] rotate-[6deg] z-10 hover:z-50 transition-all hover:scale-105"
    >
      <CardContainer>
        <CardBody className="feature-card w-[299px]">
          <CardItem translateZ="50">
            <WindowBar url="app.finance-x.io/insights" />
          </CardItem>

          <CardItem translateZ="90" className="p-4 flex flex-col gap-4">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl">
                  <PieChart size={14} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Performance</h3>
                  <p className="text-[10px] text-slate-500">This month</p>
                </div>
              </div>
              <span className="text-[9px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-full font-medium">
                Monthly
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-2.5 bg-slate-950/40 border border-slate-700/20 rounded-xl hover:border-slate-600/30 transition-all"
                >
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                  <p className="text-sm font-bold text-white mt-1 leading-tight">{stat.value}</p>
                  <div className={`flex items-center gap-0.5 mt-1 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                    {stat.up
                      ? <ArrowUpRight size={10} />
                      : <ArrowDownRight size={10} />
                    }
                    <span className="text-[10px] font-semibold">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Category breakdown */}
            <div className="flex flex-col gap-2.5">
              <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">Revenue Breakdown</p>
              {categories.map((cat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
                      <span className="text-[10px] text-slate-300 font-medium">{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 tabular-nums font-semibold">{cat.percent}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-950/60 rounded-full overflow-hidden border border-slate-700/20">
                    <div
                      className={`h-full ${cat.color} rounded-full shadow-sm ${cat.glow}`}
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Insight banner */}
            <div className="flex items-start gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-3 py-2.5">
              <Sparkles size={12} className="text-cyan-400 mt-0.5 shrink-0" />
              <p className="text-[10px] text-cyan-300 leading-relaxed">
                Profit up <span className="font-bold">+15%</span> — best month since January
              </p>
            </div>

          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

function WindowBar({ url }: { url: string }) {
  return (
    <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-700/30 bg-slate-800/60">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="w-2 h-2 rounded-full bg-green-500" />
      </div>
      <div className="flex-1 bg-slate-950/30 rounded-lg px-2 py-0.5 text-[9px] text-slate-500 font-mono">
        {url}
      </div>
    </div>
  );
}