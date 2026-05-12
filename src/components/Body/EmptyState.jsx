import React from "react";
import { FiPackage } from "react-icons/fi";
import Button from "../ui/Button";

/**
 * Friendly empty state for "no products match your filters" or
 * "API returned 0 results" situations.
 */
const EmptyState = ({
  title = "No products match your filters",
  description = "Try removing a category, widening the price range, or clearing your search.",
  actionLabel = "Reset filters",
  onAction,
  icon,
  children,
}) => (
  <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-ink-200 bg-white px-8 py-16 text-center">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-100 text-ink-500">
      {icon ?? <FiPackage className="h-5 w-5" />}
    </div>
    <div className="flex max-w-sm flex-col gap-1">
      <h3 className="text-base font-semibold tracking-tight text-ink-900">
        {title}
      </h3>
      <p className="text-sm text-ink-500">{description}</p>
    </div>
    {children
      ? children
      : onAction && (
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
  </div>
);

export default EmptyState;
