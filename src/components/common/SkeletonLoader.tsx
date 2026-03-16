/**
 * Componente Skeleton - Placeholder while loading
 * Substitui um componente real durante o carregamento
 */

import { Skeleton } from "@/components/ui/skeleton";

export interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
  circle?: boolean;
  className?: string;
}

/**
 * Skeleton genérico para componentes em carregamento
 */
export function SkeletonLoader({
  count = 1,
  height = "h-4",
  width = "w-full",
  circle = false,
  className = "",
}: SkeletonLoaderProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={`${width} ${height} ${circle ? "rounded-full" : "rounded-md"} ${className}`}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton para card
 */
export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <SkeletonLoader height="h-6" width="w-2/3" />
      <SkeletonLoader count={3} height="h-4" />
      <div className="flex gap-2">
        <SkeletonLoader height="h-8" width="w-20" />
        <SkeletonLoader height="h-8" width="w-20" />
      </div>
    </div>
  );
}

/**
 * Skeleton para lista de transações
 */
export function TransactionListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div className="flex-1 space-y-2">
            <SkeletonLoader height="h-4" width="w-1/2" />
            <SkeletonLoader height="h-3" width="w-1/3" />
          </div>
          <SkeletonLoader height="h-4" width="w-1/4" circle={false} />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton para dashboard
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <SkeletonLoader height="h-8" width="w-1/3" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Chart + List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <CardSkeleton />
        </div>
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton para perfil
 */
export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <SkeletonLoader height="h-16" width="w-16" circle />
        <div className="flex-1 space-y-2">
          <SkeletonLoader height="h-6" width="w-1/2" />
          <SkeletonLoader height="h-4" width="w-2/3" />
        </div>
      </div>
      <CardSkeleton />
    </div>
  );
}
