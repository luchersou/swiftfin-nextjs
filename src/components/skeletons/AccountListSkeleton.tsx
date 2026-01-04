import { Skeleton } from "@/components/ui/skeleton";

export function AccountListSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-48" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-36" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-[96%] ml-4 rounded-xl" />
        <Skeleton className="h-16 w-[96%] ml-4 rounded-xl" />
        <Skeleton className="h-16 w-[92%] ml-8 rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-[96%] ml-4 rounded-xl" />
      </div>
    </div>
  );
}
