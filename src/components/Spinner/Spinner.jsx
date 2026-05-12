import React from "react";
import { cn } from "../../utils/cn";

/**
 * Inline loading spinner. Pure Tailwind, no external CSS.
 * Sized via the `size` prop, themed via `tone`.
 */
const Spinner = ({ size = "md", tone = "brand", className }) => {
  const dim = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-8 w-8" : "h-5 w-5";
  const colorMap = {
    brand: "text-brand-600",
    ink: "text-ink-700",
    white: "text-white",
  };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
          dim,
          colorMap[tone],
        )}
      />
    </span>
  );
};

export default Spinner;
