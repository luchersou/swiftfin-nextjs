import { Suspense } from "react";

import { TransactionType } from "@prisma/client";
import { Metadata } from "next";

import { TransactionsSectionServer } from "@/components/pages/transactions/TransactionsSection.server";
import { TransactionsPageSkeleton } from "@/components/skeletons/TransactionsPageSkeleton";
import { TransactionFilters } from "@/types/transactions";



export const metadata: Metadata = {
  title: "Transactions",
};

type PageProps = {
  searchParams: Promise<{
    page?: string
    accountId?: string
    categoryId?: string
    type?: TransactionType
  }>
}

export default async function TransactionsPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams

  const page = Number(resolvedSearchParams.page ?? 1)
  const pageSize = 10

  const filters: TransactionFilters = {
    accountId: resolvedSearchParams.accountId,
    categoryId: resolvedSearchParams.categoryId,
    type: resolvedSearchParams.type,
  }

  return (
    <Suspense fallback={<TransactionsPageSkeleton />}>
      <TransactionsSectionServer
        page={page}
        pageSize={pageSize}
        filters={filters}
      />
    </Suspense>
  )
}
