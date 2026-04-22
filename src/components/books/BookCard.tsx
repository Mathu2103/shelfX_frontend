import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, getAuthorById, getStockStatus } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  index?: number;
}

const BookCard = ({ book, index = 0 }: BookCardProps) => {
  const author = getAuthorById(book.authorId);
  const stockStatus = getStockStatus(book.stock);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(book.id);
  const hasDiscount = book.originalPrice && book.originalPrice > book.price;
  const discountPercent = hasDiscount
    ? Math.round(((book.originalPrice! - book.price) / book.originalPrice!) * 100)
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (book.stock > 0) {
      addToCart(book);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
    >
      <Link to={`/book/${book.id}`} className="group block">
        <div className="relative rounded-xl overflow-hidden bg-card border border-border/60 shadow-card hover:shadow-book-hover hover:-translate-y-1 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-muted/40 p-6 flex items-center justify-center">
            <img
              src={book.cover}
              alt={book.title}
              className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
            />

            {/* Discount badge - top right, pill */}
            {hasDiscount && (
              <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                -{discountPercent}%
              </span>
            )}

            {/* Stock badge - top left when not in stock */}
            {stockStatus.color !== "success" && (
              <Badge
                variant={stockStatus.color === "destructive" ? "destructive" : "secondary"}
                className="absolute top-3 left-3 text-[10px] uppercase tracking-wider"
              >
                {stockStatus.label}
              </Badge>
            )}

            {/* Wishlist - subtle, top right (when no discount) or just below */}
            <button
              onClick={handleWishlistClick}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "absolute h-9 w-9 rounded-full bg-card/90 backdrop-blur border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 opacity-0 group-hover:opacity-100 transition-all duration-300",
                hasDiscount ? "top-12 right-3" : "top-3 right-3",
                inWishlist && "opacity-100 text-accent border-accent/40"
              )}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </button>

            {/* Quick add to cart - slides up on hover */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <Button
                size="sm"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md font-medium"
                onClick={handleAddToCart}
                disabled={book.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pt-4 pb-5 border-t border-border/60">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif text-base font-semibold line-clamp-1 text-foreground group-hover:text-accent transition-colors">
                {book.title}
              </h3>
              <div className="flex items-baseline gap-1.5 shrink-0">
                <span className="font-sans text-base font-semibold text-accent">
                  ${book.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground line-clamp-1">
                {author?.name}
              </p>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  ${book.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2.5">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-xs font-medium text-foreground">{book.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({book.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
