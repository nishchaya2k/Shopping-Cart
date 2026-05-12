import React from "react";
import { cn } from "../../utils/cn";

/**
 * Compact filter / section heading. Replaces the old `<span underline span>`
 * pattern with a typographic heading + optional trailing action.
 */
const SectionHeading = ({ title, action, className }) => (
  <div className={cn("flex items-center justify-between", className)}>
    <h3 className="text-sm font-semibold tracking-tight text-ink-900">
      {title}
    </h3>
    {action && <div className="text-xs">{action}</div>}
  </div>
);

export default SectionHeading;
