import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BRAND } from "../../config/brand";
import { cn } from "../../utils/cn";

/**
 * Wordmark logo. Pure SVG/icon — no raster assets, scales crisply at any size,
 * and can be recolored via Tailwind text classes.
 */
const Logo = ({ className, compact = false }) => (
  <NavLink
    to="/"
    className={cn(
      "group inline-flex items-center gap-3.5 sm:gap-4 select-none rounded-lg py-1 pr-1",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/25",
      className,
    )}
    aria-label={`${BRAND.name} — home`}
  >
    <span
      aria-hidden
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft ring-1 ring-inset ring-white/10 transition-transform duration-200 ease-out group-hover:scale-[1.02]"
    >
      <FiShoppingBag className="h-4 w-4" />
    </span>
    {!compact && (
      <span className="flex min-w-0 flex-col gap-1 leading-tight">
        <span className="text-[15px] font-semibold tracking-tight text-ink-900">
          {BRAND.name}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-400">
          Storefront
        </span>
      </span>
    )}
  </NavLink>
);

export default Logo;
