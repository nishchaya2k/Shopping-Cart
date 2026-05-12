import { useCallback, useMemo, useState } from "react";
import { DEFAULT_SORT } from "../config/sortOptions";
import { PRICE_RANGE } from "../config/priceRange";
import { filterProducts, sortProducts } from "../utils/productMeta";

const DEFAULT_PRICE_RANGE = [PRICE_RANGE.min, PRICE_RANGE.max];

const arePriceRangesDefault = (range) =>
  range[0] === PRICE_RANGE.min && range[1] === PRICE_RANGE.max;

/**
 * Orchestrates product list filters + sorting.
 *
 * Replaces the previous chained-`useEffect` approach in Home.jsx where each
 * filter would unset the others. Filters now compose, derived state is
 * computed via `useMemo`, and the API surface is small and explicit.
 *
 * @param {Array} products
 */
const useProducts = (products) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [query, setQuery] = useState("");

  const toggleCategory = useCallback((value) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  }, []);

  const removeCategory = useCallback((value) => {
    setCategories((prev) => prev.filter((c) => c !== value));
  }, []);

  const resetPriceRange = useCallback(() => {
    setPriceRange(DEFAULT_PRICE_RANGE);
  }, []);

  const resetAll = useCallback(() => {
    setCategories([]);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSort(DEFAULT_SORT);
    setQuery("");
  }, []);

  const filtered = useMemo(
    () =>
      filterProducts(products ?? [], {
        categories,
        priceRange: arePriceRangesDefault(priceRange) ? null : priceRange,
        query,
      }),
    [products, categories, priceRange, query],
  );

  const visible = useMemo(
    () => sortProducts(filtered, sort?.value),
    [filtered, sort],
  );

  const activeFilterCount =
    categories.length +
    (arePriceRangesDefault(priceRange) ? 0 : 1) +
    (sort?.value && sort.value !== DEFAULT_SORT.value ? 1 : 0) +
    (query.trim().length > 0 ? 1 : 0);

  return {
    products: visible,
    totalCount: products?.length ?? 0,
    visibleCount: visible.length,
    activeFilterCount,
    filters: {
      categories,
      priceRange,
      sort,
      query,
    },
    actions: {
      setCategories,
      toggleCategory,
      removeCategory,
      setPriceRange,
      resetPriceRange,
      setSort,
      setQuery,
      resetAll,
    },
  };
};

export default useProducts;
