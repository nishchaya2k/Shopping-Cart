import React from "react";
import { cn } from "../../utils/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 disabled:bg-ink-300 disabled:text-ink-500",
  brand:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-300 disabled:text-white",
  secondary:
    "bg-white text-ink-800 border border-ink-200 hover:bg-ink-50 hover:border-ink-300 active:bg-ink-100 disabled:text-ink-400 disabled:bg-ink-50",
  ghost:
    "bg-transparent text-ink-700 hover:bg-ink-100 active:bg-ink-200 disabled:text-ink-400",
  danger:
    "bg-white text-danger-600 border border-danger-500/30 hover:bg-danger-500/5 hover:border-danger-500/50 active:bg-danger-500/10",
  link: "bg-transparent text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline px-0 py-0",
};

const SIZE_CLASSES = {
  xs: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
  sm: "h-9 px-3.5 text-sm gap-2 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-5 text-base gap-2 rounded-xl",
};

/**
 * Generic Button primitive.
 *
 * Props:
 * - variant: "primary" | "brand" | "secondary" | "ghost" | "danger" | "link"
 * - size: "xs" | "sm" | "md" | "lg"
 * - leftIcon / rightIcon: optional ReactNode
 * - fullWidth: boolean
 * - loading: boolean
 */
const Button = React.forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    fullWidth = false,
    loading = false,
    disabled = false,
    className,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-tight",
        "transition-all duration-200 ease-smooth active:scale-[0.99] motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/45 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed select-none whitespace-nowrap",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leftIcon && <span className="-ml-0.5 inline-flex">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!loading && rightIcon && (
        <span className="-mr-0.5 inline-flex">{rightIcon}</span>
      )}
    </button>
  );
});

export default Button;
