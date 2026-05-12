import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiHeart } from "react-icons/fi";

import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import { add } from "../../redux/Slices/CartSlice";
import { toggleWishlist } from "../../redux/Slices/WishlistSlice";
import { formatCategoryLabel, formatCurrency, truncate } from "../../utils/format";

/**
 * One saved product on the wishlist page (mirrors cart line item layout).
 */
const WishlistItem = ({ post }) => {
  const dispatch = useDispatch();

  const removeFromWishlist = () => {
    dispatch(toggleWishlist(post.id));
    toast.success("Removed from wishlist");
  };

  const addToCart = () => {
    dispatch(add({ post, quantity: 1 }));
    toast.success("Added to cart");
  };

  return (
    <div className="flex items-start gap-4 sm:gap-5">
      <Link
        to={`/products/${post.id}`}
        className="relative inline-flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-ink-50 to-ink-100 sm:h-28 sm:w-28"
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-[72%] w-[72%] object-contain mix-blend-multiply"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-2xs font-medium uppercase tracking-wider text-ink-500">
          {formatCategoryLabel(post.category)}
        </span>
        <Link
          to={`/products/${post.id}`}
          className="line-clamp-2 text-sm font-semibold tracking-tight text-ink-900 hover:underline sm:text-base"
        >
          {post.title}
        </Link>
        <p className="hidden text-xs text-ink-500 sm:block">
          {truncate(post.description, 100)}
        </p>
        <div className="mt-1 flex flex-wrap gap-2 sm:hidden">
          <Button variant="secondary" size="sm" onClick={addToCart}>
            Add to cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="text-base font-semibold tabular-nums text-ink-900 sm:text-lg">
          {formatCurrency(post.price)}
        </span>
        <div className="hidden flex-col gap-2 sm:flex">
          <Button variant="secondary" size="sm" onClick={addToCart}>
            Add to cart
          </Button>
        </div>
        <IconButton
          variant="outline"
          size="sm"
          aria-label={`Remove ${post.title} from wishlist`}
          onClick={removeFromWishlist}
        >
          <FiHeart className="h-4 w-4 fill-red-500 text-red-500" />
        </IconButton>
      </div>
    </div>
  );
};

export default WishlistItem;
