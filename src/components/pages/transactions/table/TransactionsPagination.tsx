"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type TransactionsPaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export function TransactionsPagination({
  page,
  pageSize,
  totalPages,
  totalCount,
}: TransactionsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        Showing <strong>{start}-{end}</strong> of{" "}
        <strong>{totalCount}</strong>
      </div>

      <Pagination>
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => updatePage(page - 1)}
              aria-disabled={page <= 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => {
              if (totalPages <= 2) return true;

              return (
                p === 1 ||
                p === totalPages ||
                Math.abs(p - page) <= 1
              );
            })
            .map((p, index, array) => (
              <React.Fragment key={p}>
                {index > 0 && array[index - 1] !== p - 1 && (
                  <PaginationItem>
                    <span className="px-3 text-muted-foreground select-none">
                      …
                    </span>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => updatePage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            ))}


          <PaginationItem>
            <PaginationNext
              onClick={() => updatePage(page + 1)}
              aria-disabled={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
