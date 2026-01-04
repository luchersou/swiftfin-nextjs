"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
} from "lucide-react"

import { NavMain } from "@/components/layout/app-sidebar/nav-main"
import { NavUser } from "@/components/layout/app-sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LogoSidebar } from "@/components/layout/LogoSidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
      ],
    },

    {
      title: "Accounts",
      url: "/dashboard/accounts",
      icon: Wallet,
      items: [
        {
          title: "All accounts",
          url: "/dashboard/accounts",
        },
      ],
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: CreditCard,
      items: [
        {
          title: "All transactions",
          url: "/dashboard/transactions",
        },
        {
          title: "By income",
          url: "/dashboard/transactions?type=INCOME&page=1",
        },
        {
          title: "By expense",
          url: "/dashboard/transactions?type=EXPENSE&page=1",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="gap-2 group/sidebar">
        <LogoSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
