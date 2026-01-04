import { Skeleton } from "@/components/ui/skeleton";

export function AccountDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-48" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-56" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />

        <div className="rounded-xl border overflow-hidden">
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
