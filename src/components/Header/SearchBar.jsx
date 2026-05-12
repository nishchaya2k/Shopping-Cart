import React from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";

/**
 * Header search input. Controlled — `value` and `onChange` are owned by the
 * parent (typically the Home page) so search drives the same products hook.
 */
const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search products, categories…",
  className,
  inputId = "navbar-search",
}) => {
  const handleClear = () => onChange?.("");
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group relative flex h-10 w-full items-center rounded-lg bg-ink-50 ring-1 ring-inset ring-ink-200/70 transition-[background-color,box-shadow,ring-color] duration-200 ease-out",
        "hover:bg-ink-100/90 hover:ring-ink-200",
        /* Inset ring matches border-radius — no square “offset” box */
        "focus-within:bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-500/25",
        className,
      )}
    >
      <FiSearch
        aria-hidden
        className="ml-3 h-4 w-4 shrink-0 text-ink-400 transition-colors duration-150 group-focus-within:text-ink-600"
      />
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-md bg-transparent py-2 pl-2.5 pr-2 text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus-visible:ring-0"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="mr-1.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-500 transition-colors duration-150 hover:bg-ink-200/80 hover:text-ink-800 active:scale-[0.97]"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      ) : (
        <kbd className="mr-2.5 hidden shrink-0 rounded-md border border-ink-200/90 bg-white px-1.5 py-0.5 font-sans text-[10px] font-medium text-ink-400 shadow-xs sm:inline-flex">
          ⌘K
        </kbd>
      )}
    </label>
  );
};

export default SearchBar;
