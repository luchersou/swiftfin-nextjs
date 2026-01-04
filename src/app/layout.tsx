import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Management Made Simple",
  description:
    "A modern platform to manage accounts,",
  icons: {
    icon: "/finance.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      appearance={{
        theme: 'simple',
      }}
      >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(nunito.variable, "antialiased font-sans")}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
