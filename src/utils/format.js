const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);

export const formatCompact = (value) => compactFormatter.format(Number(value) || 0);

export const truncate = (text = "", max = 80) => {
  if (typeof text !== "string") return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
};

/**
 * Map an API category slug to a friendly label for display
 * (falls back to title-casing the raw value).
 */
export const formatCategoryLabel = (raw = "") =>
  String(raw)
    .split(/\s|-|_/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
