import React from "react";
import ProductCard from "./Product";
import { ProductCardSkeleton } from "../ShimmerCard/ShimmerCard";
import EmptyState from "./EmptyState";

/**
 * Reusable, responsive product grid with built-in loading + empty states.
 *
 * Breakpoints:
 *   < sm  : 1 column
 *   sm    : 2 columns
 *   lg    : 3 columns
 *   xl    : 4 columns
 */
const ProductGrid = ({
  products = [],
  loading = false,
  skeletonCount = 8,
  onResetFilters,
  emptyTitle,
  emptyDescription,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate-fade-in sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((post) => (
        <ProductCard key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProductGrid;
