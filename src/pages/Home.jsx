import React, { useMemo, useState } from "react";
import { FiSliders } from "react-icons/fi";

import useFetch from "../hooks/useFetch";
import useProducts from "../hooks/useProducts";

import Navbar from "../components/Header/Navbar";
import ProductGrid from "../components/Body/ProductGrid";
import FilterSidebar from "../components/Filter/FilterSidebar";
import MobileFilterDrawer from "../components/Filter/MobileFilterDrawer";
import SortOption from "../components/Filter/SortOption";
import ActiveFilters from "../components/Filter/ActiveFilters";
import Button from "../components/ui/Button";

import { CATEGORIES } from "../config/categories";

/**
 * Storefront landing page.
 *
 * Layout (lg+):
 *   ┌────────────┬───────────────────────────────────────────────┐
 *   │            │ Page header (count + sort + active filters)    │
 *   │  Sidebar   ├───────────────────────────────────────────────┤
 *   │  (sticky)  │                                                │
 *   │            │   Product grid                                 │
 *   │            │                                                │
 *   └────────────┴───────────────────────────────────────────────┘
 *
 * Below `lg` the sidebar collapses into a slide-in drawer triggered by the
 * "Filters" button in the header row.
 */
const Home = () => {
  const { data, loading } = useFetch("products");
  const {
    products,
    visibleCount,
    totalCount,
    activeFilterCount,
    filters,
    actions,
  } = useProducts(data);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pre-compute facet counts for the category filter
  const facets = useMemo(() => {
    const byCategory = {};
    (data ?? []).forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
    });
    return { byCategory };
  }, [data]);

  return (
    <>
      <Navbar
        searchValue={filters.query}
        onSearchChange={actions.setQuery}
      />

      <main className="container-page py-5 sm:py-6 lg:py-9">
        {/* Hero / Page header */}
        <header className="mb-6 flex flex-col gap-1.5 sm:mb-7 lg:mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            New collection
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl lg:text-[32px] lg:leading-[1.15]">
                Discover everyday essentials
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">
                A curated selection of clothing, accessories, jewelery and
                electronics — from trusted brands, at fair prices.
              </p>
            </div>
            <div className="hidden gap-2 lg:flex lg:flex-wrap lg:justify-end">
              {CATEGORIES.slice(0, 4).map((c) => {
                const active = filters.categories.includes(c.value);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => actions.toggleCategory(c.value)}
                    aria-pressed={active}
                    className={
                      active
                        ? "inline-flex h-8 items-center rounded-full bg-ink-900 px-3.5 text-xs font-medium text-white shadow-xs transition-transform duration-150 active:scale-[0.98]"
                        : "inline-flex h-8 items-center rounded-full border border-ink-200/90 bg-white px-3.5 text-xs font-medium text-ink-700 transition-[border-color,background-color,transform] duration-150 hover:border-ink-300 hover:bg-ink-50 active:scale-[0.98]"
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Desktop sticky sidebar */}
          <div className="hidden w-[264px] flex-shrink-0 lg:block xl:w-[272px]">
            <div className="sticky top-[4.75rem]">
              <FilterSidebar
                filters={filters}
                actions={actions}
                facets={facets}
                hasActive={activeFilterCount > 0}
              />
            </div>
          </div>

          {/* Main column */}
          <section className="min-w-0 flex-1">
            <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-sm text-ink-600"
                role="status"
                aria-live="polite"
              >
                {loading ? (
                  <span className="inline-block h-4 w-40 skeleton rounded" />
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-ink-900">
                      {visibleCount}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-ink-900">
                      {totalCount}
                    </span>{" "}
                    products
                  </>
                )}
              </p>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-2.5">
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<FiSliders className="h-4 w-4" />}
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden"
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink-900 px-1.5 text-[10px] font-semibold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
                <SortOption sortby={filters.sort} onChange={actions.setSort} />
              </div>
            </div>

            <ActiveFilters
              categories={filters.categories}
              priceRange={filters.priceRange}
              query={filters.query}
              onRemoveCategory={actions.removeCategory}
              onResetPrice={actions.resetPriceRange}
              onClearQuery={() => actions.setQuery("")}
              onClearAll={actions.resetAll}
              className="mb-4 sm:mb-5"
            />

            <ProductGrid
              products={products}
              loading={loading}
              onResetFilters={actions.resetAll}
            />
          </section>
        </div>
      </main>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        actions={actions}
        facets={facets}
        visibleCount={visibleCount}
        hasActive={activeFilterCount > 0}
      />
    </>
  );
};

export default Home;
