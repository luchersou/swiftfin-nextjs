"use client";

import {
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TypewriterEffect } from "../ui/typewriter-effect";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

export function KeyFeatures() {
  return (
    <section className="relative w-full px-6 py-28 lg:px-24 bg-slate-950 overflow-hidden">

      {/* Grid pattern */}
      <div className="grid-dark" />

      {/* Corner vignettes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-radial-[at_0%_0%] from-slate-950 to-transparent" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-radial-[at_100%_0%] from-slate-950 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-radial-[at_0%_100%] from-slate-950 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-radial-[at_100%_100%] from-slate-950 to-transparent" />
      </div>

      {/* Subtle emerald glow behind heading */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[80px] rounded-full" />

      <motion.div
        className="relative z-20 mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-8 bg-emerald-500/60" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400/80">
            Platform capabilities
          </span>
          <div className="h-px w-8 bg-emerald-500/60" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-slate-100 pb-14"
        >
          <TypewriterEffect words={financeWords} />
        </motion.h2>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <BentoGrid>
            {features.map((feature) => (
              <BentoGridItem
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit mb-1">
                    <feature.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                }
                className={`
                  ${feature.className}
                  relative overflow-hidden
                  bg-white/[0.02] backdrop-blur-md
                  border border-white/[0.06]
                  hover:border-emerald-500/20
                  hover:bg-white/[0.04]
                  transition-all duration-300
                  group
                `}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/auth/sign-in"
            className="group relative flex items-center gap-3 px-8 py-3.5 text-sm font-semibold rounded-full
                       bg-emerald-500 text-slate-950
                       hover:bg-emerald-400
                       transition-all duration-300
                       shadow-[0_0_24px_rgb(16_185_129/0.25)]
                       hover:shadow-[0_0_36px_rgb(16_185_129/0.4)]
                       hover:scale-[1.03]"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

const financeWords = [
  { text: "Everything", className: "text-3xl sm:text-4xl font-bold text-slate-100" },
  { text: "you",        className: "text-3xl sm:text-4xl font-bold text-slate-100" },
  { text: "need",       className: "text-3xl sm:text-4xl font-bold text-slate-100" },
  { text: "to",         className: "text-3xl sm:text-4xl font-bold text-slate-100" },
  { text: "manage",     className: "text-3xl sm:text-4xl font-bold text-slate-100" },
  { text: "your",       className: "text-3xl sm:text-4xl font-bold text-slate-100" },
  { text: "finances",   className: "text-3xl sm:text-4xl font-bold text-emerald-400" },
];

const features = [
  {
    icon: TrendingUp,
    title: "Real-time analytics",
    description: "Monitor cash flow, revenue, and expenses with live updates across all accounts.",
    className: "col-span-2 md:col-span-2",
  },
  {
    icon: Shield,
    title: "Bank-level security",
    description: "Your data is protected with encryption, access control, and industry best practices.",
    className: "col-span-2 md:col-span-1",
  },
  {
    icon: Zap,
    title: "Automated reporting",
    description: "Generate detailed financial reports automatically and export them in seconds.",
    className: "col-span-1 md:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Smart insights",
    description: "Identify trends, anomalies, and opportunities with intelligent analysis.",
    className: "col-span-1 md:col-span-1 md:row-span-2",
  },
  {
    icon: Layers,
    title: "Unified dashboard",
    description: "All your financial information in one clean, intuitive interface.",
    className: "col-span-1 md:col-span-1",
  },
  {
    icon: Sparkles,
    title: "Built for scale",
    description: "Designed to grow with you, from personal finance to complex business operations.",
    className: "col-span-1 md:col-span-1",
  },
];