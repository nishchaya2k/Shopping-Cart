import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { cn } from "../../utils/cn";
import { formatCompact } from "../../utils/format";

/**
 * Renders 5 stars (full / half / outline) plus an optional review count.
 * The legacy export name `StarReviews` is preserved for backwards compat
 * with existing import sites.
 *
 * Props:
 * - stars: 0..5
 * - reviews: number
 * - size: "sm" | "md"
 * - showCount: boolean
 */
const SIZE = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

const RatingStars = ({
  stars = 0,
  reviews,
  size = "sm",
  showCount = true,
  className,
}) => {
  const safeStars = Math.max(0, Math.min(5, Number(stars) || 0));
  return (
    <div
      className={cn("inline-flex items-center gap-1.5 text-ink-600", className)}
      role="img"
      aria-label={`Rated ${safeStars.toFixed(1)} out of 5${
        reviews ? `, ${reviews} reviews` : ""
      }`}
    >
      <span className="inline-flex items-center gap-px text-accent-500">
        {Array.from({ length: 5 }, (_, i) => {
          const value = i + 1;
          if (safeStars >= value) {
            return <IoIosStar key={i} className={SIZE[size]} />;
          }
          if (safeStars >= value - 0.5) {
            return <IoIosStarHalf key={i} className={SIZE[size]} />;
          }
          return (
            <IoIosStarOutline
              key={i}
              className={cn(SIZE[size], "text-ink-300")}
            />
          );
        })}
      </span>
      <span className="text-xs font-medium tabular-nums text-ink-600">
        {safeStars.toFixed(1)}
      </span>
      {showCount && typeof reviews === "number" && (
        <span className="text-xs tabular-nums text-ink-400">
          ({formatCompact(reviews)})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
