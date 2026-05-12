import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";

import Navbar from "../components/Header/Navbar";
import WishlistItem from "../components/Body/WishlistItem";
import Button from "../components/ui/Button";
import EmptyState from "../components/Body/EmptyState";
import useFetch from "../hooks/useFetch";
import { clearWishlist } from "../redux/Slices/WishlistSlice";

/**
 * Wishlist page — same idea as cart: list saved products or an empty state.
 * Resolves products from the catalog API using IDs stored in Redux.
 */
const Wishlist = () => {
  const dispatch = useDispatch();
  const ids = useSelector((state) => state.wishlist?.ids ?? []);
  const { data: products, loading } = useFetch("products");

  const wishlistProducts = useMemo(() => {
    if (!products?.length || !ids.length) return [];
    const byId = new Map(products.map((p) => [p.id, p]));
    return ids.map((id) => byId.get(id)).filter(Boolean);
  }, [products, ids]);

  const count = wishlistProducts.length;

  return (
    <>
      <Navbar />
      <main className="container-page py-8 lg:py-12">
        <header className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              Wishlist
            </h1>
            <p className="text-sm text-ink-500">
              {loading
                ? "Loading saved items…"
                : count === 0
                  ? "No saved items yet."
                  : `${count} saved item${count === 1 ? "" : "s"}.`}
            </p>
          </div>
          {count > 0 && (
            <Button variant="ghost" size="sm" onClick={() => dispatch(clearWishlist())}>
              Clear wishlist
            </Button>
          )}
        </header>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl bg-ink-100 sm:h-32"
              />
            ))}
          </div>
        ) : count > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section
              aria-label="Wishlist items"
              className="rounded-2xl border border-ink-200/80 bg-white shadow-card lg:col-span-2"
            >
              <ul className="divide-y divide-ink-200/70">
                {wishlistProducts.map((post) => (
                  <li key={post.id} className="px-5 py-5 sm:px-6">
                    <WishlistItem post={post} />
                  </li>
                ))}
              </ul>
            </section>

            <aside
              aria-label="Wishlist summary"
              className="h-fit rounded-2xl border border-ink-200/80 bg-white p-6 shadow-card lg:sticky lg:top-24"
            >
              <h2 className="text-base font-semibold tracking-tight text-ink-900">
                Summary
              </h2>
              <p className="mt-3 text-sm text-ink-600">
                Items here are saved for later. Add them to your cart whenever you are
                ready to buy.
              </p>
              <Link to="/cart" className="mt-6 block">
                <Button variant="brand" size="md" fullWidth>
                  View cart
                </Button>
              </Link>
              <Link to="/" className="mt-3 block">
                <Button variant="secondary" size="md" fullWidth>
                  Continue shopping
                </Button>
              </Link>
            </aside>
          </div>
        ) : (
          <EmptyState
            title="Your wishlist is empty"
            description="Tap the heart on a product to save it here. You can open this list anytime from the header."
            icon={<FiHeart className="h-5 w-5" />}
          >
            <Link to="/">
              <Button variant="brand" size="md">
                Browse products
              </Button>
            </Link>
          </EmptyState>
        )}
      </main>
    </>
  );
};

export default Wishlist;
