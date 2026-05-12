import React from "react";
import { FiX } from "react-icons/fi";
import Button from "../ui/Button";
import { CATEGORIES } from "../../config/categories";
import { PRICE_RANGE } from "../../config/priceRange";
import { formatCurrency } from "../../utils/format";
import { cn } from "../../utils/cn";

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex h-8 max-w-full items-center gap-1.5 rounded-full bg-ink-50 pl-2.5 pr-1 text-xs font-medium text-ink-700 ring-1 ring-inset ring-ink-200/80 animate-fade-in">
    <span className="min-w-0 truncate">{label}</span>
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove filter ${label}`}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors duration-150 hover:bg-ink-200/80 hover:text-ink-800 active:scale-[0.96]"
    >
      <FiX className="h-3 w-3" />
    </button>
  </span>
);

/**
 * Renders chips for every currently-applied filter and a "Clear all" CTA.
 * Returns null when no filters are active so the layout collapses cleanly.
 */
const ActiveFilters = ({
  categories = [],
  priceRange,
  query = "",
  onRemoveCategory,
  onResetPrice,
  onClearQuery,
  onClearAll,
  className,
}) => {
  const priceActive =
    priceRange &&
    (priceRange[0] !== PRICE_RANGE.min || priceRange[1] !== PRICE_RANGE.max);
  const queryActive = query.trim().length > 0;
  const total = categories.length + (priceActive ? 1 : 0) + (queryActive ? 1 : 0);
  if (total === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-2", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
        Filters
      </span>
      {queryActive && (
        <Chip label={`“${query}”`} onRemove={onClearQuery} />
      )}
      {categories.map((value) => {
        const cat = CATEGORIES.find((c) => c.value === value);
        return (
          <Chip
            key={value}
            label={cat?.label ?? value}
            onRemove={() => onRemoveCategory?.(value)}
          />
        );
      })}
      {priceActive && (
        <Chip
          label={`${formatCurrency(priceRange[0])} – ${formatCurrency(priceRange[1])}`}
          onRemove={onResetPrice}
        />
      )}
      <Button variant="link" size="xs" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
};

export default ActiveFilters;
