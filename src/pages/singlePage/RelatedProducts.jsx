import React from "react";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/Body/Product";
import { ProductCardSkeleton } from "../../components/ShimmerCard/ShimmerCard";

const RelatedProducts = ({ category, selectedPost }) => {
  const { data, loading } = useFetch(`products/category/${category}`);

  const filteredData = data?.filter((post) => post.id !== selectedPost.id);

  if (!loading && (!filteredData || filteredData.length === 0)) {
    return null;
  }

  return (
    <section aria-labelledby="related-heading" className="mt-14">
      <header className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            You may also like
          </p>
          <h2
            id="related-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-ink-900 sm:text-[28px]"
          >
            Related items
          </h2>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : filteredData?.map((post) => (
              <ProductCard key={post.id} id={post.id} post={post} />
            ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
