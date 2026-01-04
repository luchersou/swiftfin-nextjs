import { Skeleton } from "@/components/ui/skeleton"

export function ChartSkeleton() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-[300px] w-full" />
      </div>
      
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </section>
  )
}