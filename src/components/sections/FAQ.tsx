"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. We use industry-standard encryption and security practices to protect your data at all times.",
  },
  {
    question: "Is the platform free?",
    answer:
      "You can use the platform for free with essential features. Paid plans unlock advanced tools.",
  },
  {
    question: "Can I import my financial data?",
    answer:
      "Yes. You can import data using CSV files or connect supported financial institutions.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The app works perfectly on desktop, tablet, and mobile browsers.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel at any time without penalties.",
  },
];

export function FAQ() {
  return (
    <section className="relative w-full px-6 py-28 lg:px-24 bg-white overflow-hidden">

      {/* Grid pattern */}
      <div className="absolute inset-0 [background-size:28px_28px] [background-image:linear-gradient(to_right,rgb(0_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.04)_1px,transparent_1px)]" />

      {/* Corner vignettes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-radial-[at_0%_0%] from-white to-transparent" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-radial-[at_100%_0%] from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-radial-[at_0%_100%] from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-radial-[at_100%_100%] from-white to-transparent" />
      </div>

      {/* Emerald glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-500/8 blur-[80px] rounded-full" />

      <div className="relative z-20 mx-auto max-w-3xl">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-8 bg-emerald-500/60" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600/80">
            Got questions?
          </span>
          <div className="h-px w-8 bg-emerald-500/60" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-zinc-900 text-center mb-14"
        >
          Frequently asked{" "}
          <span className="text-emerald-500">questions</span>
        </motion.h2>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-zinc-200 bg-white px-5
                           hover:border-emerald-400/50 hover:shadow-sm
                           transition-all duration-300 shadow-xs"
              >
                <AccordionTrigger className="hover:no-underline text-left text-zinc-900 font-medium py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}