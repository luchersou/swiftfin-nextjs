import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function TransactionsPageSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" /> 
        <Skeleton className="h-4 w-32" /> 
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-[140px]" />
          <Skeleton className="h-9 w-[140px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>

        <Skeleton className="h-9 w-[160px]" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="hidden sm:grid grid-cols-7 gap-4 px-6 py-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-7 gap-4 px-6 py-4"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10 justify-self-end" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
