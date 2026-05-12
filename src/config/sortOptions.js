/**
 * Sort options. `value` is consumed by `sortProducts` in src/utils/productMeta.js.
 */
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "name-asc", label: "Name: A-Z" },
];

export const DEFAULT_SORT = SORT_OPTIONS[0];
