"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Shield, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const techStack = [
  {
    name: "Next.js",
    category: "Framework",
    description: "React framework for production with server-side rendering and optimal performance.",
    icon: "⚡",
    gradient: "from-slate-400/20 via-slate-500/20 to-slate-600/20",
    glowColor: "slate-500",
    badge: "Frontend",
  },
  {
    name: "TypeScript",
    category: "Language",
    description: "Type-safe JavaScript for bulletproof code quality and developer experience.",
    icon: "📘",
    gradient: "from-blue-400/20 via-blue-500/20 to-blue-600/20",
    glowColor: "blue-500",
    badge: "Language",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    description: "Utility-first framework for building custom designs without leaving your HTML.",
    icon: "🎨",
    gradient: "from-cyan-400/20 via-cyan-500/20 to-cyan-600/20",
    glowColor: "cyan-500",
    badge: "Styling",
  },
  {
    name: "shadcn/ui",
    category: "Components",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    icon: "🧩",
    gradient: "from-zinc-400/20 via-zinc-500/20 to-zinc-600/20",
    glowColor: "zinc-500",
    badge: "UI",
  },
  {
    name: "Supabase",
    category: "Backend",
    description: "Open source Firebase alternative with real-time PostgreSQL database.",
    icon: "🔥",
    gradient: "from-emerald-400/20 via-emerald-500/20 to-emerald-600/20",
    glowColor: "emerald-500",
    badge: "Backend",
  },
  {
    name: "Prisma",
    category: "ORM",
    description: "Next-generation ORM for Node.js with type-safe database queries.",
    icon: "💎",
    gradient: "from-indigo-400/20 via-indigo-500/20 to-indigo-600/20",
    glowColor: "indigo-500",
    badge: "Database",
  },
  {
    name: "React Hook Form",
    category: "Forms",
    description:
      "Performant and flexible form state management with minimal re-renders.",
    icon: "📝",
    gradient: "from-emerald-400/20 via-emerald-500/20 to-emerald-600/20",
    glowColor: "emerald-500",
    badge: "Forms",
  },
  {
    name: "Zod",
    category: "Validation",
    description:
      "Type-safe schema validation with static type inference for TypeScript.",
    icon: "🛡️",
    gradient: "from-indigo-400/20 via-indigo-500/20 to-indigo-600/20",
    glowColor: "indigo-500",
    badge: "Validation",
  },
]

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Sub-second load times with Next.js App Router and edge optimization.",
    iconBg: "from-yellow-500/10 to-orange-500/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Type-Safe",
    description: "End-to-end type safety from database to UI with TypeScript and Prisma.",
    iconBg: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Battle-tested stack used by thousands of companies worldwide.",
    iconBg: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-400",
  },
]

export function TechStack() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-stone-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-6 px-5 py-2.5 bg-gradient-to-r from-slate-800/80 to-slate-800/40 backdrop-blur-xl text-slate-200 hover:from-slate-800 hover:to-slate-800/60 border-slate-700/50 shadow-lg shadow-blue-500/10">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              Enterprise-Grade Technology
            </Badge>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Engineered with the best tools
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
            Every line of code is crafted using cutting-edge technologies trusted by industry leaders worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-16 md:mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-slate-800/50 h-full group hover:border-slate-700 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <CardContent className="p-6 sm:p-8 text-center relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} mb-5 shadow-lg`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="my-16 md:my-20 max-w-5xl mx-auto bg-gradient-to-r from-transparent via-slate-800 to-transparent h-px" />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <Card className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border-slate-800/50 h-full hover:border-slate-700 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <CardContent className="p-4 sm:p-5 md:p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-4xl sm:text-5xl md:text-6xl drop-shadow-2xl"
                    >
                      {tech.icon}
                    </motion.div>
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] sm:text-xs bg-slate-800/80 backdrop-blur-sm text-slate-300 hover:bg-slate-700 border-slate-700/50 shadow-lg px-2.5 py-1"
                    >
                      {tech.badge}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {tech.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      {tech.category}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  <div className="relative mt-4 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${tech.gradient.replace(/\/20/g, '')} opacity-60`}
                      initial={{ x: '-100%' }}
                      whileInView={{ x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient.replace(/\/20/g, '')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}