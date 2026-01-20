import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { getAuthorById, getStockStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mt-2">
              Save books you love for later! They'll appear here.
            </p>
            <Link to="/books">
              <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                Browse Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">
          My Wishlist
          <span className="text-muted-foreground font-sans text-xl ml-3">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="grid gap-4">
          {items.map((book, index) => {
            const author = getAuthorById(book.authorId);
            const stockStatus = getStockStatus(book.stock);
            const hasDiscount = book.originalPrice && book.originalPrice > book.price;

            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-card rounded-lg border hover:shadow-book transition-shadow"
              >
                <Link to={`/book/${book.id}`} className="shrink-0">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-24 h-36 object-cover rounded-md"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/book/${book.id}`}
                        className="font-serif text-lg font-semibold hover:text-accent transition-colors line-clamp-1"
                      >
                        {book.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">{author?.name}</p>
                    </div>
                    <Badge
                      variant={stockStatus.color === "success" ? "default" : stockStatus.color === "warning" ? "secondary" : "destructive"}
                      className={cn(
                        stockStatus.color === "success" && "bg-success text-success-foreground"
                      )}
                    >
                      {stockStatus.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-serif text-xl font-bold">${book.price.toFixed(2)}</span>
                    {hasDiscount && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${book.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto pt-4">
                    <Button
                      size="sm"
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => {
                        addToCart(book);
                        removeFromWishlist(book.id);
                      }}
                      disabled={book.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromWishlist(book.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
