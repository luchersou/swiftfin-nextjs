"use client";

import {
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  Layers,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TypewriterEffect } from "../ui/typewriter-effect";

export function KeyFeatures() {
  return (
    <section className="relative w-full px-6 py-24 lg:px-24 bg-gradient-to-b from-slate-950 via-slate-800 to-slate-950 overflow-hidden">
      <div
        className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#404040_1px,transparent_1px)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-20 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-slate-100 pb-14">
            <TypewriterEffect words={financeWords} />
          </h2>
          <BentoGrid>
            {features.map((feature) => (
              <BentoGridItem
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={<feature.icon className="h-8 w-8 text-emerald-400" />}
                className={`${feature.className} bg-white/3 backdrop-blur-lg border border-white/15`}
              />
            ))}
          </BentoGrid>
          <div className="mt-12 flex justify-center">
            <Link
              href="/start-trial" 
              className={`flex items-center space-x-2 px-8 py-3 text-lg font-semibold rounded-full 
                        bg-emerald-500 transition-all duration-300 shadow-lg 
                        hover:bg-emerald-400 hover:scale-[1.02]`}
            >
              <span>Start Your Free Trial Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </ motion.div>
      </div>
    </section>
  );
}

const financeWords = [
  {
    text: "Everything",
    className: "text-3xl font-bold text-slate-100",
  },
  {
    text: "you",
    className: "text-3xl font-bold text-slate-100",
  },
  {
    text: "need",
    className: "text-3xl font-bold text-slate-100",
  },
  {
    text: "to",
    className: "text-3xl font-bold text-slate-100",
  },
  {
    text: "manage",
    className: "text-3xl font-bold text-slate-100",
  },
  {
    text: "your",
    className: "text-3xl font-bold text-slate-100",
  },
  {
    text: "finances",
    className: "text-3xl font-bold text-emerald-400", 
  },
];

const features = [
  {
    icon: TrendingUp,
    title: "Real-time analytics",
    description:
      "Monitor cash flow, revenue, and expenses with live updates across all accounts.",
    className: "col-span-2 md:col-span-2",
  },
  {
    icon: Shield,
    title: "Bank-level security",
    description:
      "Your data is protected with encryption, access control, and industry best practices.",
    className: "col-span-2 md:col-span-1",
  },
  {
    icon: Zap,
    title: "Automated reporting",
    description:
      "Generate detailed financial reports automatically and export them in seconds.",
    className: "col-span-1 md:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Smart insights",
    description:
      "Identify trends, anomalies, and opportunities with intelligent analysis.",
    className: "col-span-1 md:col-span-1 md:row-span-2",
  },
  {
    icon: Layers,
    title: "Unified dashboard",
    description:
      "All your financial information in one clean, intuitive interface.",
    className: "col-span-1 md:col-span-1",
  },
  {
    icon: Sparkles,
    title: "Built for scale",
    description:
      "Designed to grow with you, from personal finance to complex business operations.",
    className: "col-span-1 md:col-span-1",
  },
];