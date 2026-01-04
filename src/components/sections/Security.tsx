"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Fingerprint, Server, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const securityFeatures = [
  {
    icon: Shield,
    title: "Bank-level encryption",
    description: "Your data is protected with 256-bit SSL encryption, the same security used by major financial institutions.",
  },
  {
    icon: Lock,
    title: "Secure authentication",
    description: "Multi-factor authentication and biometric login keep your account safe from unauthorized access.",
  },
  {
    icon: Eye,
    title: "Privacy first",
    description: "We never sell your data. Your financial information stays private and is only used to improve your experience.",
  },
  {
    icon: Server,
    title: "Secure infrastructure",
    description: "Our servers are hosted in certified data centers with 24/7 monitoring and regular security audits.",
  },
]

const certifications = [
  "SOC 2 Type II",
  "ISO 27001",
  "GDPR Compliant",
  "PCI DSS Level 1",
]

export function Security() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-grade security
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your data is safe with us
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600">
            We take security seriously. Your financial data is protected with the highest standards of encryption and security protocols.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200 
                  }}
                  className="flex-shrink-0"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <Fingerprint className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                    256-bit SSL Encryption
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    Every piece of data transmitted between you and our servers is encrypted with military-grade security. Your information is completely unreadable to anyone trying to intercept it.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      >
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1.5" />
                          {cert}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-12 md:my-16 max-w-5xl mx-auto bg-slate-200" />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 h-full hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileInView={{ 
                        scale: [1, 1.1, 1],
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center"
                    >
                      <feature.icon className="w-6 h-6 text-slate-700" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <Separator className="mb-8 max-w-md mx-auto bg-slate-200" />
          
          <p className="text-slate-600 text-sm sm:text-base mb-4">
            Have questions about our security practices?
          </p>
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Lock className="w-4 h-4 mr-2" />
            View Security Documentation
          </Button>
        </motion.div>
      </div>
    </section>
  )
}