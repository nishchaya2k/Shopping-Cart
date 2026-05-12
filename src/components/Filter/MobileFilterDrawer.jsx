import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import FilterSidebar from "./FilterSidebar";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import { cn } from "../../utils/cn";

/**
 * Slide-in (right edge) drawer that hosts the FilterSidebar on small viewports.
 * Locks body scroll while open and traps focus to the drawer.
 */
const MobileFilterDrawer = ({
  open,
  onClose,
  filters,
  actions,
  facets,
  visibleCount,
  hasActive,
}) => {
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/35 backdrop-blur-[2px] transition-opacity duration-200 ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-ink-100/90 bg-white shadow-card-hover transition-transform duration-300 ease-smooth",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-ink-100 px-4 sm:px-5">
          <h2 className="text-base font-semibold tracking-tight text-ink-900">
            Filters
          </h2>
          <IconButton
            variant="ghost"
            size="md"
            onClick={onClose}
            aria-label="Close filters"
          >
            <FiX className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-5">
          <FilterSidebar
            filters={filters}
            actions={actions}
            facets={facets}
            hasActive={hasActive}
            variant="bare"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2.5 border-t border-ink-100 bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-3 sm:p-5">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={actions.resetAll}
            className="h-11 min-h-[44px]"
          >
            Reset
          </Button>
          <Button variant="brand" size="md" fullWidth onClick={onClose} className="h-11 min-h-[44px]">
            View {visibleCount} results
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default MobileFilterDrawer;
