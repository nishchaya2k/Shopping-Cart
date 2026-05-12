import React from "react";
import { cn } from "../../utils/cn";

const VARIANT_CLASSES = {
  solid: "bg-ink-900 text-white hover:bg-ink-800",
  subtle: "bg-white/90 backdrop-blur text-ink-700 hover:bg-white shadow-soft",
  ghost: "bg-transparent text-ink-600 hover:bg-ink-100 hover:text-ink-900",
  outline:
    "bg-white text-ink-700 border border-ink-200 hover:border-ink-300 hover:bg-ink-50",
};

const SIZE_CLASSES = {
  sm: "h-8 w-8 rounded-lg text-sm",
  md: "h-10 w-10 rounded-lg text-base",
  lg: "h-11 w-11 rounded-xl text-lg",
};

/**
 * Square button used for icon-only actions (cart, wishlist, close, etc.).
 * Always require an `aria-label`.
 */
const IconButton = React.forwardRef(function IconButton(
  {
    children,
    variant = "ghost",
    size = "md",
    className,
    type = "button",
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  if (process.env.NODE_ENV !== "production" && !ariaLabel) {
    // eslint-disable-next-line no-console
    console.warn("[IconButton] missing required `aria-label` prop");
  }
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center transition-[background-color,color,transform,box-shadow] duration-200 ease-smooth active:scale-[0.97] motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/45 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default IconButton;
