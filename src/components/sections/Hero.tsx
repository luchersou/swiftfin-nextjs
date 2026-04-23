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
import { HeroCards } from "./HeroCards";

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
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 pt-25">
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

      <HeroCards className="hidden lg:block" />
    </div>
  );
}