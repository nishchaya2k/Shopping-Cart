import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "../../utils/cn";

/**
 * Collapsible section used inside the FilterSidebar.
 * Accessible: real <button> as the trigger with aria-expanded/aria-controls.
 */
const FilterSection = ({
  id,
  title,
  defaultOpen = true,
  action,
  children,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = `${id}-content`;
  return (
    <section className={cn("border-b border-ink-100 py-3.5 last:border-b-0", className)}>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="group flex flex-1 items-center justify-between gap-3 rounded-md py-1.5 text-left text-sm font-semibold tracking-tight text-ink-900 transition-colors duration-150 hover:text-ink-700"
        >
          {title}
          <FiChevronDown
            aria-hidden
            className={cn(
              "h-4 w-4 text-ink-400 transition-transform duration-200 ease-smooth",
              open ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
        {open && action && <div className="flex items-center">{action}</div>}
      </div>
      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-smooth",
          open ? "grid-rows-[1fr] mt-2.5" : "grid-rows-[0fr] mt-0",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
};

export default FilterSection;
