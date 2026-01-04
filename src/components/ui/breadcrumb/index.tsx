"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem as ShadBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./primitives"

export type BreadcrumbItem = {
  label: string
  href?: string
}

type AppBreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: AppBreadcrumbsProps) {
  if (!items.length) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <ShadBreadcrumbItem key={index}>
              {!isLast && item.href ? (
                <>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                  
                </>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </ShadBreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
