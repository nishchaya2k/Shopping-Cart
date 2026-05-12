import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FiHeart, FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
// FiUser — re-enable when Sign in is implemented

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import IconButton from "../ui/IconButton";
import { PRIMARY_NAV } from "../../config/navigation";
import { cn } from "../../utils/cn";
import useScrollPosition from "../../hooks/useScrollPosition";

/**
 * Sticky top navbar: logo, optional primary links, search, actions.
 * Primary links come from `PRIMARY_NAV` in `config/navigation.js` (empty = hidden).
 *
 * Search is optional — pass `searchValue` / `onSearchChange` from pages that filter by query.
 */
const Navbar = ({ searchValue = "", onSearchChange }) => {
  const { cart } = useSelector((state) => state.cart);
  const wishlistCount = useSelector((state) => state.wishlist?.ids?.length ?? 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition(8);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const hasNavLinks = PRIMARY_NAV.length > 0;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl",
        "border-b transition-[box-shadow,border-color] duration-200 ease-smooth",
        scrolled
          ? "border-ink-200/80 shadow-nav"
          : "border-ink-100/80 shadow-none",
      )}
    >
      <div className="container-page">
        {/* Row 1: logo, primary nav, search (desktop), actions */}
        <div className="flex h-16 items-center gap-3 sm:gap-4 lg:gap-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {hasNavLinks ? (
              <IconButton
                variant="ghost"
                size="md"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="shrink-0 md:hidden"
              >
                {mobileOpen ? (
                  <FiX className="h-5 w-5" />
                ) : (
                  <FiMenu className="h-5 w-5" />
                )}
              </IconButton>
            ) : (
              /* Same width as menu IconButton so logo doesn’t slide when links are empty */
              <span className="h-10 w-10 shrink-0 md:hidden" aria-hidden />
            )}
            <Logo className="min-w-0 shrink" />
          </div>

          {hasNavLinks ? (
            <nav
              aria-label="Primary"
              className="hidden items-center gap-0.5 md:flex lg:gap-1"
            >
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-ink-900"
                        : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-ink-900"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          ) : (
            /* Invisible slot ≈ former primary nav width (md+) so search/actions stay put */
            <div
              aria-hidden
              className="hidden shrink-0 md:block md:w-[300px] lg:w-[320px]"
            />
          )}

          <div className="ml-auto hidden min-w-0 max-w-md flex-1 md:block md:pl-2 lg:max-w-lg lg:pl-6 xl:max-w-xl">
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <NavLink
              to="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} saved`}
              className={({ isActive }) =>
                cn(
                  "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-600 transition-colors duration-150 hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 active:scale-[0.97]",
                  isActive && "text-ink-900",
                )
              }
            >
              <FiHeart className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink-900 px-1 text-[10px] font-semibold leading-none text-white animate-pop-in">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-600 transition-colors duration-150 hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              <FiShoppingCart className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold leading-none text-white animate-pop-in"
                >
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Sign in — TODO: implement auth tomorrow
            <button
              type="button"
              aria-label="Account"
              className="ml-0.5 hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-ink-200/90 bg-white pl-1.5 pr-3 text-sm font-medium text-ink-700 transition-[border-color,background-color,transform] duration-150 hover:border-ink-300 hover:bg-ink-50 active:scale-[0.99] sm:inline-flex"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-ink-700 to-ink-900 text-white shadow-xs">
                <FiUser className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <span className="hidden lg:inline">Sign in</span>
            </button>
            */}
          </div>
        </div>

        {/* Row 2: search bar on small screens */}
        <div className="pb-2.5 pt-0.5 md:hidden">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            inputId="navbar-search-mobile"
          />
        </div>
      </div>

      {/* Mobile menu — only when PRIMARY_NAV has links */}
      {hasNavLinks && mobileOpen && (
        <div
          className="md:hidden border-t border-ink-100 bg-white/98 backdrop-blur-sm animate-fade-in"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            aria-label="Mobile primary"
            className="container-page flex flex-col py-1.5"
          >
            {PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-ink-100 text-ink-900"
                      : "text-ink-700 hover:bg-ink-50",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
