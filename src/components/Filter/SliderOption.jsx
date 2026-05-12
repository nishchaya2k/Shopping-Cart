import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PRICE_RANGE } from "../../config/priceRange";
import { formatCurrency } from "../../utils/format";

/**
 * Price-range filter built on `rc-slider`. The visual styling (rail/track/handle)
 * is centralised in `src/index.css` so all sliders look identical brand-wide.
 *
 * Props are kept backwards compatible with the previous component name
 * (`SliderButton`) so existing call sites can continue to import it.
 */
const PriceRangeFilter = ({
  priceRange = [PRICE_RANGE.min, PRICE_RANGE.max],
  onChange,
  min = PRICE_RANGE.min,
  max = PRICE_RANGE.max,
  step = PRICE_RANGE.step,
}) => (
  <div className="flex flex-col gap-3 px-0.5 pt-0.5">
    <div className="px-1.5">
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={priceRange}
        onChange={onChange}
        allowCross={false}
      />
    </div>
    <div className="flex items-center gap-2">
      <PriceField
        label="Min"
        value={priceRange[0]}
        onChange={(v) => onChange([Math.min(v, priceRange[1] - step), priceRange[1]])}
        min={min}
        max={priceRange[1] - step}
      />
      <span aria-hidden className="text-xs text-ink-400">
        —
      </span>
      <PriceField
        label="Max"
        value={priceRange[1]}
        onChange={(v) => onChange([priceRange[0], Math.max(v, priceRange[0] + step)])}
        min={priceRange[0] + step}
        max={max}
      />
    </div>
    <p className="text-xs text-ink-500">
      {formatCurrency(priceRange[0])} — {formatCurrency(priceRange[1])}
    </p>
  </div>
);

const PriceField = ({ label, value, onChange, min, max }) => (
  <label className="flex flex-1 flex-col gap-1">
    <span className="text-2xs font-medium uppercase tracking-wider text-ink-500">
      {label}
    </span>
    <div className="flex items-center rounded-lg border border-ink-200/90 bg-white text-sm shadow-xs ring-1 ring-inset ring-transparent transition-[border-color,box-shadow,ring-width,ring-color] duration-150 focus-within:border-brand-500/40 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-500/20">
      <span className="pl-2.5 pr-1 text-ink-400">$</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(next);
        }}
        className="h-9 w-full min-w-0 rounded-md bg-transparent pr-2 text-sm text-ink-800 tabular-nums focus:outline-none focus-visible:ring-0"
      />
    </div>
  </label>
);

export default PriceRangeFilter;
