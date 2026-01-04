import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ThemeProvider } from "@/providers/theme-provider"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s • Finance App",
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset
          className="
            flex flex-col
            bg-gradient-to-br
            from-[oklch(var(--dashboard-bg-start))]
            to-[oklch(var(--dashboard-bg-end))]
          "
        >
          <header
            className="
              flex h-16 pl-4 shrink-0 items-center gap-2
              border-b border-border
              bg-background/80 backdrop-blur-md
            "
          >
            <SidebarTrigger />
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6">
            {children}
            <Toaster position="top-right" richColors />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
