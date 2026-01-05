"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import {
  BarChart3,
  PieChart,
  CreditCard,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Zap,
} from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-8 lg:px-12 xl:px-24 py-12 lg:py-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-500 to-slate-700">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute -top-40 -left-40
            h-[420px] w-[420px]
            rounded-full
            bg-blue-500/25
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute top-1/3 -right-48
            h-[520px] w-[520px]
            rounded-full
            bg-cyan-400/20
            blur-3xl
            animate-pulse
            [animation-delay:2s]
          "
        />

        <div
          className="
            absolute bottom-[-220px] left-1/4
            h-[460px] w-[460px]
            rounded-full
            bg-indigo-500/20
            blur-3xl
            animate-pulse
            [animation-delay:4s]
          "
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start"
        >
        <h1 className="text-sm sm:text-base lg:text-lg xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 pt-25">
          Financial Intelligence
          <span className="block mt-2 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-200 bg-clip-text text-transparent">
            Meets Simplicity
          </span>
        </h1>
        
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
          Transform your financial operations with real-time analytics, automated reporting, and intelligent forecasting. 
          <span className="text-slate-300"> Built for modern finance teams.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
          <Button variant="outline" size="default">
            Start Free Trial
          </Button>

          <Button variant="default" size="default">
            Watch Demo
          </Button>
        </div>
     
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto lg:mx-0">
          {[
            { icon: Shield, label: "Bank-level Security", desc: "256-bit encryption" },
            { icon: Zap, label: "Real-time Sync", desc: "Instant updates" },
            { icon: TrendingUp, label: "Smart Insights", desc: "AI-powered analytics" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start gap-2">
              <div className="p-2 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-lg">
                <feature.icon size={16} className="text-slate-100" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-slate-100">{feature.label}</p>
                <p className="text-[10px] text-slate-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
      </div>

      <div className="hidden lg:block relative w-full max-w-[350px] lg:max-w-[420px] xl:max-w-[480px] aspect-square flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="absolute left-0 top-[15%] rotate-[-6deg] z-30 hover:z-50 transition-all hover:scale-105"
        >
          <CardContainer>
            <CardBody className="bg-slate-900/70 backdrop-blur-3xl border border-slate-700/50 rounded-2xl w-[280px] h-[350] shadow-5xl shadow-slate-900/50 overflow-hidden">
              <CardItem translateZ="50">
                <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-700/30 bg-slate-800/60">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="flex-1 bg-slate-950/30 rounded-lg px-2 py-0.5 text-[9px] text-slate-500 font-mono">
                    app.finance-x.io/analytics
                  </div>
                </div>
              </CardItem>

              <div className="flex">
                <CardItem translateZ="70">
                  <div className="w-10 py-4 border-r border-slate-700/30 flex flex-col items-center gap-4 bg-slate-950/30">
                    <LayoutDashboard size={14} className="text-blue-400" />
                    <BarChart3 size={14} className="text-slate-600" />
                    <Users size={14} className="text-slate-600" />
                    <Settings size={14} className="text-slate-600" />
                  </div>
                </CardItem>

                <CardItem translateZ="100" className="p-3 w-full">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xs font-bold text-white">Revenue</h3>
                      <p className="text-[9px] text-slate-500 mt-0.5">Last 7 days</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-white">$47.5K</div>
                      <div className="text-[9px] text-emerald-400 flex items-center gap-0.5 justify-end">
                        <ArrowUpRight size={9} /> +12.5%
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-end gap-1 h-16 bg-slate-950/30 rounded-lg p-1.5">
                    {[45, 65, 35, 85, 55, 75, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  <div className="mt-1.5 flex justify-between text-[8px] text-slate-600">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <span key={i}>{day}</span>
                    ))}
                  </div>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 4 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="absolute right-[-5%] top-[25%] rotate-[6deg] z-20 hover:z-50 transition-all hover:scale-105"
        >
          <CardContainer>
            <CardBody className="bg-slate-900/70 backdrop-blur-3xl border border-slate-700/50 rounded-2xl w-[280px] h-[350] shadow-5xl shadow-slate-900/50 overflow-hidden">
              <CardItem translateZ="50">
                <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-700/30 bg-slate-800/60">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="flex-1 bg-slate-950/30 rounded-lg px-2 py-0.5 text-[9px] text-slate-500 font-mono">
                    app.finance-x.io/payments
                  </div>
                </div>
              </CardItem>

              <CardItem translateZ="90" className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-lg">
                    <CreditCard size={12} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-white">Transactions</h3>
                    <p className="text-[8px] text-slate-500">Today's activity</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { name: "Client Payment", amount: 2840.00, time: "2:34 PM" },
                    { name: "Software License", amount: -129.99, time: "1:15 PM" },
                    { name: "Consulting Fee", amount: 450.00, time: "12:01 PM" },
                    { name: "Cloud Services", amount: -89.00, time: "10:23 AM" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 bg-slate-950/30 rounded-lg hover:bg-slate-950/50 transition-colors">
                      <div>
                        <p className="text-[11px] font-medium text-white">{tx.name}</p>
                        <p className="text-[8px] text-slate-600">{tx.time}</p>
                      </div>
                      <span className={`text-[11px] font-semibold ${tx.amount > 0 ? "text-emerald-400" : "text-slate-400"}`}>
                        {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700/30 flex justify-between items-center">
                  <span className="text-[9px] text-slate-500">Balance</span>
                  <span className="text-xs font-bold text-white">$18,447.19</span>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="absolute left-[25%] bottom-[-5%] rotate-[6deg] z-10 hover:z-50 transition-all hover:scale-105"
        >
          <CardContainer>
            <CardBody className="bg-slate-900/70 backdrop-blur-3xl border border-slate-700/50 rounded-2xl w-[260px] h-[350] shadow-5xl shadow-slate-900/50 overflow-hidden">
              <CardItem translateZ="50">
                <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-700/30 bg-slate-800/60">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="flex-1 bg-slate-950/30 rounded-lg px-2 py-0.5 text-[9px] text-slate-500 font-mono">
                    app.finance-x.io/insights
                  </div>
                </div>
              </CardItem>

              <CardItem translateZ="90" className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-lg">
                    <PieChart size={12} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-white">Performance</h3>
                    <p className="text-[8px] text-slate-500">This month</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {[
                    { label: "Revenue", value: "$24.8K", change: "+8.2%", up: true },
                    { label: "Clients", value: "143", change: "+12%", up: true },
                    { label: "Expenses", value: "$8.2K", change: "-2.1%", up: false },
                    { label: "Profit", value: "$16.6K", change: "+15%", up: true },
                  ].map((stat, i) => (
                    <div key={i} className="p-1.5 bg-slate-950/30 rounded-lg">
                      <p className="text-[8px] text-slate-500 mb-0.5">{stat.label}</p>
                      <p className="text-xs font-bold text-white">{stat.value}</p>
                      <p className={`text-[8px] flex items-center gap-0.5 mt-0.5 ${stat.up ? "text-emerald-400" : "text-slate-400"}`}>
                        {stat.up ? <ArrowUpRight size={7} /> : <ArrowDownRight size={7} />}
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  {[
                    { name: "Consulting", percent: 52, color: "bg-blue-400" },
                    { name: "Products", percent: 31, color: "bg-purple-400" },
                    { name: "Services", percent: 17, color: "bg-cyan-400" },
                  ].map((cat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span className="text-slate-400">{cat.name}</span>
                        <span className="text-slate-500 font-medium">{cat.percent}%</span>
                      </div>
                      <div className="h-1 bg-slate-950/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${cat.color} rounded-full transition-all`}
                          style={{ width: `${cat.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>
      </div>
    </div>
  );
}