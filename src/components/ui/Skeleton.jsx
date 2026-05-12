import React from "react";
import { cn } from "../../utils/cn";

/**
 * Generic shimmer skeleton block.
 *
 * - Use `rounded` prop or className to vary corner radius.
 * - Width / height should be set via className utilities.
 */
const Skeleton = ({ className, rounded = "rounded-md", as: Tag = "div", ...rest }) => (
  <Tag
    aria-hidden
    className={cn("skeleton", rounded, className)}
    {...rest}
  />
);

export default Skeleton;
