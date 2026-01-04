import { Suspense } from "react";
import { TransactionType } from "@prisma/client";
import { TransactionFilters } from "@/types/transactions";

import { TransactionsSectionServer } from "@/components/pages/transactions/TransactionsSection.server";
import { TransactionsPageSkeleton } from "@/components/skeletons/TransactionsPageSkeleton";
import { Metadata } from "next";

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
