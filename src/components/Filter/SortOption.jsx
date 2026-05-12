import React, { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { cn } from "../../utils/cn";
import { SORT_OPTIONS, DEFAULT_SORT } from "../../config/sortOptions";

/**
 * Custom sort dropdown.
 *
 * Replaces `react-select` for a much smaller surface area, full visual
 * control over states (hover/focus/active), and proper keyboard support.
 *
 * Props (back-compat):
 * - sortby: { value, label } | null
 * - sortbyData: optional override of options
 * - onChange(option, action): mirrors the old API; `action.action === "select"`
 *   for normal selection.
 */
const SortOption = ({
  sortby,
  sortbyData = SORT_OPTIONS,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const onEscape = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const value = sortby ?? DEFAULT_SORT;

  const handleSelect = (option) => {
    setOpen(false);
    onChange?.(option, { action: "select" });
  };

  return (
    <div ref={ref} className={cn("relative w-full sm:w-auto", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3.5 text-sm font-medium",
          "transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.99]",
          "sm:min-w-[200px]",
          open
            ? "border-brand-500/90 text-ink-900 shadow-ring"
            : "border-ink-200/90 text-ink-700 hover:border-ink-300 hover:bg-ink-50/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2",
        )}
      >
        <span className="flex items-center gap-2 truncate">
          <span className="text-2xs font-medium uppercase tracking-wider text-ink-400">
            Sort
          </span>
          <span className="truncate">{value.label}</span>
        </span>
        <FiChevronDown
          aria-hidden
          className={cn(
            "h-4 w-4 text-ink-400 transition-transform duration-200 ease-smooth",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Sort by"
          className="absolute right-0 z-30 mt-1.5 w-full min-w-[220px] origin-top-right overflow-hidden rounded-xl border border-ink-200/90 bg-white py-1 shadow-card-hover animate-slide-in-up"
        >
          {sortbyData.map((option) => {
            const selected = option.value === value.value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full min-h-[40px] items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors duration-150",
                    selected
                      ? "bg-brand-50/70 text-ink-900"
                      : "text-ink-700 hover:bg-ink-50",
                  )}
                >
                  {option.label}
                  {selected && (
                    <FiCheck className="h-4 w-4 text-brand-600" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortOption;
