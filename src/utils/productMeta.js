/**
 * Derives presentational metadata that the FakeStore API doesn't provide
 * (discount, stock state, "new" / "bestseller" badges) so the storefront
 * can demo production-grade card features without a real backend.
 *
 * Derivation is deterministic from `product.id` so the UI is stable across
 * renders / page reloads.
 */

const DISCOUNT_BUCKETS = [0, 0, 0, 10, 15, 20, 25, 30];

export const getDiscountPercent = (product) => {
  if (!product) return 0;
  return DISCOUNT_BUCKETS[product.id % DISCOUNT_BUCKETS.length];
};

export const getOriginalPrice = (product) => {
  const discount = getDiscountPercent(product);
  if (!discount) return null;
  return Number((product.price / (1 - discount / 100)).toFixed(2));
};

/**
 * @returns {{ label: string, tone: "success" | "warning" | "danger" }}
 */
export const getStockState = (product) => {
  const bucket = product?.id % 10;
  if (bucket === 0) return { label: "Out of Stock", tone: "danger" };
  if (bucket === 1 || bucket === 4) return { label: "Low Stock", tone: "warning" };
  return { label: "In Stock", tone: "success" };
};

export const isNewArrival = (product) => product?.id % 7 === 0;
export const isBestseller = (product) => (product?.rating?.rate ?? 0) >= 4.5;

/**
 * Sort products in-place using a stable copy.
 *
 * @param {Array} products
 * @param {"featured" | "price-asc" | "price-desc" | "rating-desc" | "name-asc"} sortBy
 */
export const sortProducts = (products, sortBy) => {
  if (!Array.isArray(products) || !sortBy || sortBy === "featured") {
    return products ?? [];
  }
  const copy = [...products];
  switch (sortBy) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return copy.sort(
        (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0),
      );
    case "name-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
};

/**
 * Apply category + price + search filters together.
 *
 * Unlike the previous logic — which forced filters to be mutually exclusive —
 * this composes them, matching modern ecommerce expectations.
 */
export const filterProducts = (
  products,
  { categories = [], priceRange = null, query = "" } = {},
) => {
  if (!Array.isArray(products)) return [];
  const lower = query.trim().toLowerCase();

  return products.filter((p) => {
    if (categories.length > 0 && !categories.includes(p.category)) return false;
    if (priceRange) {
      const [min, max] = priceRange;
      if (p.price < min || p.price > max) return false;
    }
    if (lower) {
      const haystack = `${p.title} ${p.description} ${p.category}`.toLowerCase();
      if (!haystack.includes(lower)) return false;
    }
    return true;
  });
};
