"use client";

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
    <section className="py-16 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-semibold text-zinc-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-lg border bg-white px-4"
            >
              <AccordionTrigger className="hover:no-underline text-left text-zinc-900">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-zinc-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
