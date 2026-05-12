import React from "react";
import { FaCheck } from "react-icons/fa";
import { cn } from "../../utils/cn";

/**
 * Custom-styled checkbox built on a real `<input type="checkbox">`
 * for keyboard/screen-reader accessibility.
 *
 * Props:
 * - id (required for label association)
 * - label: ReactNode shown next to the box
 * - description: optional secondary text
 * - count: optional trailing number (e.g. result count)
 */
const Checkbox = ({
  id,
  label,
  description,
  count,
  checked = false,
  onChange,
  disabled = false,
  className,
  ...rest
}) => (
  <label
    htmlFor={id}
    className={cn(
      "group flex min-h-[44px] w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2",
      "transition-colors duration-150 hover:bg-ink-50/90",
      disabled && "pointer-events-none opacity-50",
      className,
    )}
  >
    <span className="relative inline-flex h-[18px] w-[18px] flex-shrink-0">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[7px] border border-ink-300/90 bg-white transition-[border-color,background-color,box-shadow] duration-150 checked:border-brand-600 checked:bg-brand-600 hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/45 focus-visible:ring-offset-2"
        {...rest}
      />
      <FaCheck
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
      />
    </span>
    <span className="flex flex-1 items-center justify-between gap-2 text-sm">
      <span className="flex flex-col">
        <span className="text-ink-800 group-hover:text-ink-900">{label}</span>
        {description && (
          <span className="text-xs text-ink-500">{description}</span>
        )}
      </span>
      {typeof count === "number" && (
        <span className="text-xs font-medium text-ink-400 tabular-nums">
          {count}
        </span>
      )}
    </span>
  </label>
);

export default Checkbox;
