import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FiCheck,
  FiHeart,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";

import RatingStars from "./StarReviews";
import Badge from "../ui/Badge";
import IconButton from "../ui/IconButton";
import { add, remove } from "../../redux/Slices/CartSlice";
import { toggleWishlist } from "../../redux/Slices/WishlistSlice";
import { cn } from "../../utils/cn";
import { formatCategoryLabel, formatCurrency, truncate } from "../../utils/format";
import {
  getDiscountPercent,
  getOriginalPrice,
  getStockState,
  isBestseller,
  isNewArrival,
} from "../../utils/productMeta";

/**
 * Product card — layout is flex column with `mt-auto` footer so every card
 * aligns price + CTA on the same baseline in the grid.
 */
const ProductCard = ({ id, post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const wishlistIds = useSelector((state) => state.wishlist?.ids ?? []);
  const [imageLoaded, setImageLoaded] = useState(false);

  const inCart = cart.some((entry) => entry.item.id === post.id);
  const inWishlist = wishlistIds.includes(post.id);
  const stock = getStockState(post);
  const discount = getDiscountPercent(post);
  const originalPrice = getOriginalPrice(post);
  const outOfStock = stock.tone === "danger";

  const goToDetail = () => navigate(`/products/${id}`);
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetail();
    }
  };

  const handleCart = (event) => {
    event.stopPropagation();
    if (outOfStock) return;
    if (inCart) {
      dispatch(remove({ post }));
      toast("Removed from cart", { icon: "🗑️" });
    } else {
      dispatch(add({ post, quantity: 1 }));
      toast.success("Added to cart");
    }
  };

  const handleWishlist = (event) => {
    event.stopPropagation();
    dispatch(toggleWishlist(post.id));
    toast(inWishlist ? "Removed from wishlist" : "Added to wishlist", {
      icon: inWishlist ? "💔" : "❤️",
    });
  };

  return (
    <article
      tabIndex={0}
      role="link"
      aria-label={post.title}
      onClick={goToDetail}
      onKeyDown={onKeyDown}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white",
        "border border-ink-200/70 shadow-card",
        "transition-[transform,box-shadow,border-color] duration-200 ease-out",
        "hover:-translate-y-px hover:border-ink-200 hover:shadow-card-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2",
      )}
    >
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-gradient-to-b from-ink-50 to-ink-100/90">
        {!imageLoaded && (
          <div aria-hidden className="skeleton absolute inset-0" />
        )}
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "absolute inset-0 m-auto h-[76%] w-[76%] object-contain mix-blend-multiply",
            "transition-transform duration-300 ease-out will-change-transform",
            "group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 translate-y-1 opacity-0 transition-[opacity,transform] duration-300 ease-out max-md:pointer-events-auto max-md:translate-y-0 max-md:opacity-100 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={handleCart}
            disabled={outOfStock}
            aria-label={inCart ? "Remove from cart" : "Quick add"}
            className={cn(
              "pointer-events-auto inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium",
              "bg-ink-900 text-white shadow-soft transition-[background-color,transform] duration-200 ease-out",
              "hover:bg-ink-800 active:scale-[0.99] active:bg-ink-950",
              "disabled:cursor-not-allowed disabled:bg-ink-300 disabled:active:scale-100",
            )}
          >
            {inCart ? (
              <>
                <FiCheck className="h-4 w-4 shrink-0" />
                In your cart
              </>
            ) : outOfStock ? (
              "Out of stock"
            ) : (
              <>
                <FiPlus className="h-4 w-4 shrink-0" />
                Quick add
              </>
            )}
          </button>
        </div>

        <div className="absolute left-2.5 top-2.5 flex max-w-[calc(100%-3.5rem)] flex-col items-start gap-1">
          {discount > 0 && (
            <Badge tone="danger" size="sm" className="shadow-xs">
              −{discount}%
            </Badge>
          )}
          {isNewArrival(post) && (
            <Badge tone="dark" size="sm" className="shadow-xs">
              New
            </Badge>
          )}
          {isBestseller(post) && (
            <Badge tone="accent" size="sm" className="shadow-xs">
              Bestseller
            </Badge>
          )}
        </div>

        <div
          className={cn(
            "absolute right-2.5 top-2.5 transition-opacity duration-200 ease-out",
            "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100",
          )}
        >
          <IconButton
            variant="subtle"
            size="sm"
            aria-label={
              inWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={inWishlist}
            onClick={handleWishlist}
            className="shadow-xs ring-1 ring-black/5"
          >
            <FiHeart
              className={cn(
                "h-4 w-4 transition-colors duration-150",
                inWishlist
                  ? "fill-red-500 text-red-500"
                  : "text-ink-700",
              )}
            />
          </IconButton>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        <div className="flex min-h-[1.125rem] items-start justify-between gap-2">
          <span className="truncate text-2xs font-medium uppercase tracking-wider text-ink-500">
            {formatCategoryLabel(post.category)}
          </span>
          <span
            className={cn(
              "shrink-0 text-2xs font-medium tabular-nums",
              stock.tone === "success" && "text-brand-700",
              stock.tone === "warning" && "text-amber-700",
              stock.tone === "danger" && "text-red-600",
            )}
          >
            <span className="inline-flex items-center gap-1">
              <span
                aria-hidden
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  stock.tone === "success" && "bg-brand-500",
                  stock.tone === "warning" && "bg-amber-500",
                  stock.tone === "danger" && "bg-red-500",
                )}
              />
              {stock.label}
            </span>
          </span>
        </div>

        <h3
          className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug tracking-tight text-ink-900"
          title={post.title}
        >
          {post.title}
        </h3>

        <p
          className="line-clamp-2 min-h-[2.375rem] text-xs leading-relaxed text-ink-600"
          title={post.description}
        >
          {truncate(post.description, 100)}
        </p>

        <div className="pt-0.5">
          <RatingStars
            stars={post.rating?.rate}
            reviews={post.rating?.count}
            size="sm"
          />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-base font-semibold tracking-tight text-ink-900 tabular-nums">
                {formatCurrency(post.price)}
              </span>
              {originalPrice && (
                <span className="text-xs text-ink-400 line-through tabular-nums">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            {stock.tone === "success" && (
              <span className="mt-0.5 block text-[10px] font-medium leading-none text-ink-400">
                Free shipping
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCart}
            disabled={outOfStock}
            aria-label={inCart ? "Remove from cart" : "Add to cart"}
            className={cn(
              "inline-flex h-9 min-w-[4.5rem] shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold",
              "transition-[background-color,color,transform,box-shadow] duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2",
              "active:scale-[0.98] disabled:active:scale-100",
              inCart
                ? "bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-200/80 hover:bg-brand-100"
                : "bg-ink-900 text-white shadow-xs hover:bg-ink-800",
              outOfStock && "cursor-not-allowed bg-ink-200 text-ink-500 ring-0 hover:bg-ink-200",
            )}
          >
            {inCart ? (
              <>
                <FiCheck className="h-3.5 w-3.5 shrink-0" />
                Added
              </>
            ) : (
              <>
                <FiShoppingBag className="h-3.5 w-3.5 shrink-0" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
