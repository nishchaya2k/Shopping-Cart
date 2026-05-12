import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

import useFetch from "../../hooks/useFetch";
import { add, remove } from "../../redux/Slices/CartSlice";
import { toggleWishlist } from "../../redux/Slices/WishlistSlice";

import Navbar from "../../components/Header/Navbar";
import RatingStars from "../../components/Body/StarReviews";
import RelatedProducts from "./RelatedProducts";
import Skeleton from "../../components/ui/Skeleton";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";
import { cn } from "../../utils/cn";
import { formatCategoryLabel, formatCurrency } from "../../utils/format";
import {
  getDiscountPercent,
  getOriginalPrice,
  getStockState,
} from "../../utils/productMeta";

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Share on Facebook" },
  { icon: FaTwitter, label: "Share on Twitter" },
  { icon: FaInstagram, label: "Share on Instagram" },
  { icon: FaLinkedinIn, label: "Share on LinkedIn" },
  { icon: FaPinterest, label: "Share on Pinterest" },
];

const SinglePage = () => {
  const { id } = useParams();
  const { data: post, loading } = useFetch(`products/${id}`);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const wishlistIds = useSelector((state) => state.wishlist?.ids ?? []);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scroll(0, 0);
  }, [id]);

  const inCart = post && cart.some((entry) => entry.item.id === post.id);
  const inWishlist = post && wishlistIds.includes(post.id);
  const stock = post ? getStockState(post) : null;
  const discount = post ? getDiscountPercent(post) : 0;
  const originalPrice = post ? getOriginalPrice(post) : null;
  const outOfStock = stock?.tone === "danger";

  const addToCart = () => {
    if (!post || outOfStock) return;
    if (inCart) {
      dispatch(remove({ post }));
      toast("Removed from cart", { icon: "🗑️" });
    } else {
      dispatch(add({ post, quantity }));
      toast.success(`Added ${quantity} × to cart`);
      setQuantity(1);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container-page py-6 lg:py-12">
        {loading || !post ? (
          <DetailSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 rounded-2xl border border-ink-200/80 bg-white p-5 shadow-card lg:grid-cols-2 lg:gap-12 lg:p-10">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-ink-50 to-ink-100">
                {discount > 0 && (
                  <Badge tone="danger" size="md" className="absolute left-4 top-4">
                    −{discount}%
                  </Badge>
                )}
                <img
                  src={post.image}
                  alt={post.title}
                  className="max-h-[78%] max-w-[78%] object-contain mix-blend-multiply"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-2xs font-medium uppercase tracking-[0.18em] text-brand-700">
                  {formatCategoryLabel(post.category)}
                </span>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  {post.title}
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <RatingStars
                    stars={post.rating?.rate}
                    reviews={post.rating?.count}
                    size="md"
                  />
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium",
                      stock.tone === "success" && "text-brand-700",
                      stock.tone === "warning" && "text-amber-700",
                      stock.tone === "danger" && "text-red-600",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        stock.tone === "success" && "bg-brand-500",
                        stock.tone === "warning" && "bg-amber-500",
                        stock.tone === "danger" && "bg-red-500",
                      )}
                    />
                    {stock.label}
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl font-bold tracking-tight text-ink-900 tabular-nums">
                    {formatCurrency(post.price)}
                  </span>
                  {originalPrice && (
                    <span className="text-base text-ink-400 line-through tabular-nums">
                      {formatCurrency(originalPrice)}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                  {post.description}
                </p>

                <div className="mt-7 flex items-stretch gap-3">
                  <div className="inline-flex h-12 items-center rounded-xl border border-ink-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="inline-flex h-full w-11 items-center justify-center text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2ch] text-center text-sm font-semibold tabular-nums text-ink-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="inline-flex h-full w-11 items-center justify-center text-ink-600 transition-colors hover:text-ink-900"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={addToCart}
                    disabled={outOfStock}
                    leftIcon={
                      inCart ? (
                        <FiCheck className="h-4 w-4" />
                      ) : (
                        <FiShoppingBag className="h-4 w-4" />
                      )
                    }
                    className="flex-1"
                  >
                    {outOfStock
                      ? "Out of stock"
                      : inCart
                        ? "Remove from cart"
                        : "Add to cart"}
                  </Button>

                  <IconButton
                    variant="outline"
                    size="lg"
                    aria-label={
                      inWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                    aria-pressed={inWishlist}
                    onClick={() => dispatch(toggleWishlist(post.id))}
                  >
                    <FiHeart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        inWishlist
                          ? "fill-red-500 text-red-500"
                          : "text-ink-700",
                      )}
                    />
                  </IconButton>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 border-t border-ink-200 pt-6 sm:grid-cols-2">
                  <InfoRow label="Category">
                    <span className="capitalize">{formatCategoryLabel(post.category)}</span>
                  </InfoRow>
                  <InfoRow label="Share">
                    <span className="inline-flex items-center gap-2">
                      {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                        <IconButton
                          key={label}
                          variant="ghost"
                          size="sm"
                          aria-label={label}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </IconButton>
                      ))}
                    </span>
                  </InfoRow>
                </div>
              </div>
            </div>

            <RelatedProducts
              ProductId={post.id}
              category={post.category}
              selectedPost={post}
            />
          </>
        )}
      </main>
    </>
  );
};

const InfoRow = ({ label, children }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="text-2xs font-medium uppercase tracking-wider text-ink-500">
      {label}
    </span>
    <span className="text-ink-700">{children}</span>
  </div>
);

const DetailSkeleton = () => (
  <div className="grid grid-cols-1 gap-8 rounded-2xl border border-ink-200/80 bg-white p-5 shadow-card lg:grid-cols-2 lg:gap-12 lg:p-10">
    <Skeleton className="aspect-square w-full" rounded="rounded-xl" />
    <div className="flex flex-col gap-4">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-5/6" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-9 w-1/2" />
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-12 w-32" rounded="rounded-xl" />
        <Skeleton className="h-12 flex-1" rounded="rounded-xl" />
        <Skeleton className="h-12 w-12" rounded="rounded-xl" />
      </div>
    </div>
  </div>
);

export default SinglePage;
