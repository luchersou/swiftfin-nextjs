"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type TransactionsFiltersProps = {
  accounts: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
};

export function TransactionsFilters({
  accounts,
  categories,
}: TransactionsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("?");
  };

  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key]) => key !== "page"
  );

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:flex-wrap sm:items-center">
      <Select
        value={searchParams.get("type") || "all"}
        onValueChange={(v) => updateFilter("type", v)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="INCOME">Income</SelectItem>
          <SelectItem value="EXPENSE">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("accountId") || "all"}
        onValueChange={(v) => updateFilter("accountId", v)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Account" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All accounts</SelectItem>
          {accounts.map((acc) => (
            <SelectItem key={acc.id} value={acc.id}>
              {acc.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("categoryId") || "all"}
        onValueChange={(v) => updateFilter("categoryId", v)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full sm:w-auto"
        >
          <X className="mr-2 h-4 w-4" />
          <span className="sm:hidden">Clear filters</span>
          <span className="hidden sm:inline">Clear</span>
        </Button>
      )}
    </div>
  );
}