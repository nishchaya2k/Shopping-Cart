import React from "react";
import FilterCategory from "./FilterCategory";
import PriceRangeFilter from "./SliderOption";
import FilterSection from "./FilterSection";
import Button from "../ui/Button";
import { CATEGORIES } from "../../config/categories";
import { PRICE_RANGE } from "../../config/priceRange";
import { cn } from "../../utils/cn";

const isPriceDefault = (range) =>
  range[0] === PRICE_RANGE.min && range[1] === PRICE_RANGE.max;

/**
 * Composed filter sidebar. Layout-agnostic — the parent decides whether to
 * mount it inside a sticky desktop column or a slide-in mobile drawer.
 *
 * Props mirror the `useProducts` hook return shape.
 */
const FilterSidebar = ({
  filters,
  actions,
  facets,
  hasActive = false,
  className,
  variant = "card",
}) => {
  const wrapperClass =
    variant === "card"
      ? "rounded-2xl border border-ink-200/70 bg-white p-4 shadow-soft"
      : "p-0";

  return (
    <aside aria-label="Filters" className={cn(wrapperClass, className)}>
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <h2 className="text-sm font-semibold tracking-tight text-ink-900">
          Filters
        </h2>
        {hasActive && (
          <Button variant="link" size="xs" onClick={actions.resetAll}>
            Reset all
          </Button>
        )}
      </div>

      <FilterSection id="filter-categories" title="Categories">
        <FilterCategory
          categories={CATEGORIES}
          selected={filters.categories}
          onToggle={actions.toggleCategory}
          getCount={facets?.byCategory ? (v) => facets.byCategory[v] ?? 0 : undefined}
        />
      </FilterSection>

      <FilterSection
        id="filter-price"
        title="Price"
        action={
          !isPriceDefault(filters.priceRange) && (
            <Button variant="link" size="xs" onClick={actions.resetPriceRange}>
              Reset
            </Button>
          )
        }
      >
        <PriceRangeFilter
          priceRange={filters.priceRange}
          onChange={actions.setPriceRange}
        />
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;
