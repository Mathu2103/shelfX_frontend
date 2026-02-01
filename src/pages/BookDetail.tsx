import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, Share2, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getBookById,
  getAuthorById,
  getCategoryById,
  getBooksByCategory,
  getStockStatus,
} from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { cn } from "@/lib/utils";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(id || "");
  const author = book ? getAuthorById(book.authorId) : null;
  const category = book ? getCategoryById(book.categoryId) : null;
  const relatedBooks = book ? getBooksByCategory(book.categoryId).filter(b => b.id !== book.id).slice(0, 4) : [];
  
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Track this book as recently viewed
  useEffect(() => {
    if (book) {
      addToRecentlyViewed(book);
    }
  }, [book?.id]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!book) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-serif text-3xl font-bold">Book Not Found</h1>
          <Link to="/books">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const stockStatus = getStockStatus(book.stock);
  const inWishlist = isInWishlist(book.id);
  const hasDiscount = book.originalPrice && book.originalPrice > book.price;
  const discountPercent = hasDiscount
    ? Math.round(((book.originalPrice! - book.price) / book.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/books" className="hover:text-foreground">Books</Link>
          <span>/</span>
          {category && (
            <>
              <Link to={`/books?category=${category.slug}`} className="hover:text-foreground">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{book.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted shadow-book-hover">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-4 py-2">
                -{discountPercent}% OFF
              </Badge>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Stock */}
            <div className="flex items-center gap-3">
              {category && (
                <Badge variant="secondary">{category.name}</Badge>
              )}
              <Badge
                variant={stockStatus.color === "success" ? "default" : stockStatus.color === "warning" ? "secondary" : "destructive"}
                className={cn(
                  stockStatus.color === "success" && "bg-success text-success-foreground"
                )}
              >
                {stockStatus.label}
              </Badge>
            </div>

            {/* Title & Author */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold">{book.title}</h1>
              <p className="text-lg text-muted-foreground mt-2">
                by{" "}
                <Link to={`/books?author=${author?.id}`} className="text-accent hover:underline">
                  {author?.name}
                </Link>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={cn(
                      "h-5 w-5",
                      star <= Math.floor(book.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{book.rating}</span>
              <span className="text-muted-foreground">
                ({book.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-4xl font-bold">${book.price.toFixed(2)}</span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  ${book.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{book.description}</p>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    disabled={quantity >= book.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={cn(
                    inWishlist && "bg-destructive/10 border-destructive text-destructive"
                  )}
                >
                  <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-accent" />
                <div className="text-sm">
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">On orders over $35</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-accent" />
                <div className="text-sm">
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">100% protected</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="mt-16">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
            >
              Reviews ({book.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">Book Information</h3>
                <dl className="space-y-3">
                  {[
                    { label: "ISBN", value: book.isbn },
                    { label: "Pages", value: book.pages },
                    { label: "Publisher", value: book.publisher },
                    { label: "Language", value: book.language },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">About the Author</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={author?.image}
                    alt={author?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{author?.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{author?.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>Reviews feature coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-16">
            <BookGrid
              books={relatedBooks}
              title="You May Also Like"
              subtitle="More books in this category"
            />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default BookDetail;
