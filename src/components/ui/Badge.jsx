import React from "react";
import { cn } from "../../utils/cn";

const TONE_CLASSES = {
  neutral: "bg-ink-100 text-ink-700 ring-ink-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  success: "bg-brand-50 text-brand-700 ring-brand-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
  accent: "bg-violet-50 text-violet-700 ring-violet-200",
  dark: "bg-ink-900 text-white ring-ink-900/10",
};

const SIZE_CLASSES = {
  xs: "h-5 px-1.5 text-2xs gap-1",
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-7 px-2.5 text-xs gap-1.5",
};

/**
 * Inline pill / badge.
 *
 * Props:
 * - tone: visual color
 * - size: xs | sm | md
 * - icon: optional ReactNode rendered before the label
 */
const Badge = ({
  children,
  tone = "neutral",
  size = "sm",
  icon,
  className,
  ...rest
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full font-medium tracking-tight",
      "ring-1 ring-inset",
      TONE_CLASSES[tone],
      SIZE_CLASSES[size],
      className,
    )}
    {...rest}
  >
    {icon && <span className="inline-flex">{icon}</span>}
    {children}
  </span>
);

export default Badge;
