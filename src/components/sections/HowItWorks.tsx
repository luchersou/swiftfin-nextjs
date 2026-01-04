"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wallet, LineChart, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Wallet,
    title: "Add your transactions",
    description:
      "Quickly register income and expenses with smart categorization.",
    gradient: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-500",
  },
  {
    icon: LineChart,
    title: "Track your finances",
    description:
      "Visualize your cash flow, balances, and trends in real time.",
    gradient: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-500",
  },
  {
    icon: Sparkles,
    title: "Get smart insights",
    description:
      "Understand your spending patterns and make better decisions.",
    gradient: "from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-500",
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-20 overflow-hidden ">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple flow designed to give you clarity and control over your finances.
          </p>
        </motion.div>

        <div className="relative grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent -z-10 origin-center"
          />
          
          <div className="hidden md:flex absolute top-12 left-0 right-0 justify-around -z-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="w-3 h-3 rounded-full bg-primary/60 -translate-y-[5px]"
              />
            ))}
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-lg z-20"
              >
                {index + 1}
              </motion.div>

              <Card className="bg-background/60 backdrop-blur-xl border-border/50 h-full transition-all duration-300 hover:bg-background/80 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col gap-4">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                    className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                  >
                    <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                  </motion.div>

                  <h3 className="text-lg font-semibold text-black">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}