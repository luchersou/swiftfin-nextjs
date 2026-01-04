"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoDefault } from "./LogoDefault";

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
      <div
        className={cn(
          "mx-auto",
          "backdrop-blur-2xl border rounded-[2rem] shadow-lg",
          "bg-black/10 dark:bg-neutral-900/10",
          "border-white/10",
          "flex items-center justify-between",
          "px-5 py-3",
          "max-w-5xl"
        )}
      >
        <Link
          href="/"
          className="
            flex items-center gap-2 shrink-0 rounded-xl px-3 py-1.5
            bg-white/90 border border-black/5 backdrop-blur
          "
        >
          <LogoDefault />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/auth/sign-in" className="hidden lg:block">
            <Button
              variant="ghost"
              className="
                bg-white/90 text-neutral-900 hover:bg-white/100 
                border border-black/5 backdrop-blur
              "
            >
              Sign in
            </Button>
          </Link>

          <Link href="/auth/sign-up">
            <Button className="bg-neutral-900 text-white hover:opacity-90">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
