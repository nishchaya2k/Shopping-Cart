import React from "react";
import Skeleton from "../ui/Skeleton";

/**
 * Single skeleton card whose silhouette matches the real ProductCard
 * (aspect-[4/5] image area + padded body). Render N of these inside the
 * same grid the products live in for a seamless loading state.
 */
export const ProductCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-card">
    <Skeleton className="aspect-[4/5] w-full shrink-0" rounded="rounded-none" />
    <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-4 w-full max-w-[92%]" />
      <Skeleton className="h-4 w-3/5" />
      <div className="flex gap-1 pt-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-3" rounded="rounded-sm" />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-[4.5rem]" rounded="rounded-lg" />
      </div>
    </div>
  </div>
);

/**
 * Backwards-compatible default export. Renders a grid of skeleton cards
 * with the same column rules as the real product grid so the UI doesn't
 * shift when data arrives.
 */
const ShimmerCard = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default ShimmerCard;
