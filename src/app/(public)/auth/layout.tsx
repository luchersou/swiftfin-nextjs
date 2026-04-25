import { ReactNode } from "react";

import Link from "next/link";

import { LogoDefault } from "@/components/layout/LogoDefault";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center px-6 py-20",
        "overflow-hidden",
        "bg-zinc-50",
      )}
    >

      {/* Logo */}
      <Link href="/" className="absolute top-6 left-24 z-20">
        <LogoDefault />
      </Link>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74,24,27,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74,24,27,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Radial fade on edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(250,250,250,0.98)_100%)]" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}