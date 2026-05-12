import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

import Navbar from "../components/Header/Navbar";
import CartItem from "../components/Body/CartItem";
import Button from "../components/ui/Button";
import EmptyState from "../components/Body/EmptyState";
import { formatCurrency } from "../utils/format";

const SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 5.99;
const TAX_RATE = 0.08;

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const totals = useMemo(() => {
    const itemCount = cart.reduce((acc, c) => acc + c.quantity, 0);
    const subtotal = cart.reduce(
      (acc, c) => acc + c.item.price * c.quantity,
      0,
    );
    const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    return { itemCount, subtotal, shipping, tax, total };
  }, [cart]);

  return (
    <>
      <Navbar />
      <main className="container-page py-8 lg:py-12">
        <header className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Your cart
          </h1>
          <p className="text-sm text-ink-500">
            {totals.itemCount === 0
              ? "Your cart is empty."
              : `${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"} ready for checkout.`}
          </p>
        </header>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section
              aria-label="Cart items"
              className="rounded-2xl border border-ink-200/80 bg-white shadow-card lg:col-span-2"
            >
              <ul className="divide-y divide-ink-200/70">
                {cart.map((cartItem, index) => (
                  <li key={cartItem.item.id} className="px-5 py-5 sm:px-6">
                    <CartItem post={cartItem.item} itemIndex={index} />
                  </li>
                ))}
              </ul>
            </section>

            <aside
              aria-label="Order summary"
              className="h-fit rounded-2xl border border-ink-200/80 bg-white p-6 shadow-card lg:sticky lg:top-24"
            >
              <h2 className="text-base font-semibold tracking-tight text-ink-900">
                Order summary
              </h2>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
                <SummaryRow
                  label={
                    totals.shipping === 0
                      ? "Shipping"
                      : `Shipping (${formatCurrency(totals.subtotal)} · under ${formatCurrency(SHIPPING_THRESHOLD)})`
                  }
                  value={
                    totals.shipping === 0 ? (
                      <span className="font-medium text-brand-700">Free</span>
                    ) : (
                      formatCurrency(totals.shipping)
                    )
                  }
                />
                <SummaryRow
                  label={`Tax (${Math.round(TAX_RATE * 100)}%)`}
                  value={formatCurrency(totals.tax)}
                />
              </dl>
              <div className="my-4 h-px w-full bg-ink-200" />
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink-700">Total</span>
                <span className="text-2xl font-bold tracking-tight text-ink-900 tabular-nums">
                  {formatCurrency(totals.total)}
                </span>
              </div>
              <Button
                variant="brand"
                size="lg"
                fullWidth
                className="mt-5"
                rightIcon={<FiArrowRight className="h-4 w-4" />}
              >
                Checkout
              </Button>
              <p className="mt-3 text-center text-xs text-ink-500">
                Free shipping on orders above {formatCurrency(SHIPPING_THRESHOLD)}.
              </p>
            </aside>
          </div>
        ) : (
          <EmptyState
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Explore our latest collection to get started."
            icon={<FiShoppingBag className="h-5 w-5" />}
          >
            <Link to="/">
              <Button variant="brand" size="md">
                Continue shopping
              </Button>
            </Link>
          </EmptyState>
        )}
      </main>
    </>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-4 text-ink-600">
    <dt className="truncate">{label}</dt>
    <dd className="text-ink-900 tabular-nums">{value}</dd>
  </div>
);

export default Cart;
