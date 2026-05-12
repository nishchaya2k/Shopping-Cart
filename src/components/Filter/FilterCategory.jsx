import React from "react";
import Checkbox from "../ui/Checkbox";

/**
 * Multi-select category filter (replaces the legacy single-radio version).
 *
 * Props:
 * - categories: [{ id, label, value }]
 * - selected: string[]   currently selected category `value`s
 * - onToggle: (value: string) => void
 * - getCount: (value: string) => number   optional facet count
 */
const FilterCategory = ({ categories, selected = [], onToggle, getCount }) => (
  <div role="group" aria-label="Categories" className="flex flex-col gap-0.5">
    {categories.map((category) => (
      <Checkbox
        key={category.id}
        id={`cat-${category.id}`}
        label={category.label}
        checked={selected.includes(category.value)}
        onChange={() => onToggle(category.value)}
        count={getCount ? getCount(category.value) : undefined}
      />
    ))}
  </div>
);

export default FilterCategory;
