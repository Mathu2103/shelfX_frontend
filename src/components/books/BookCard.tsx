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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/book/${book.id}`} className="group block">
        <div className="relative rounded-lg overflow-hidden bg-card shadow-book hover:shadow-book-hover transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Actions */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <Button
                size="sm"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleAddToCart}
                disabled={book.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "shrink-0",
                  inWishlist && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                )}
                onClick={handleWishlistClick}
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {hasDiscount && (
                <Badge className="bg-destructive text-destructive-foreground">
                  -{discountPercent}%
                </Badge>
              )}
              {stockStatus.color !== "success" && (
                <Badge variant={stockStatus.color === "destructive" ? "destructive" : "secondary"}>
                  {stockStatus.label}
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-serif text-lg font-semibold line-clamp-1 group-hover:text-accent transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {author?.name}
            </p>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{book.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({book.reviewCount.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="font-serif text-xl font-bold text-foreground">
                ${book.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  ${book.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
