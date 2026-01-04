import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center px-6 pt-40 pb-20",
        "overflow-hidden",
        "bg-gray-200",
        "bg-[linear-gradient(to_right,rgba(74,24,27,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.03)_1px,transparent_1px)]",
        "bg-[size:52px_52px]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(250,250,250,0.95)_100%)]" />
      {children}
    </main>
  );
}
