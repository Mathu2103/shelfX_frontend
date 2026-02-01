import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bundle, getBookById } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface DashboardBundlesProps {
  bundles: Bundle[];
}

const DashboardBundles = ({ bundles }: DashboardBundlesProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddBundleToCart = (bundle: Bundle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add all books from bundle to cart
    bundle.bookIds.forEach(bookId => {
      const book = getBookById(bookId);
      if (book) {
        addToCart(book);
      }
    });

    toast({
      title: "Bundle added to cart! 🎉",
      description: `${bundle.name} has been added to your cart.`,
    });
  };

  if (bundles.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Special Bundles & Offers
          </CardTitle>
          <Link to="/bundles">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {bundles.slice(0, 2).map((bundle) => {
              const discount = Math.round(
                ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
              );
              const books = bundle.bookIds.map(id => getBookById(id)).filter(Boolean);

              return (
                <Link 
                  key={bundle.id}
                  to="/bundles"
                  className="block group"
                >
                  <div className="relative p-4 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                    {/* Discount Badge */}
                    <Badge className="absolute -top-3 -right-2 bg-destructive text-destructive-foreground shadow-lg">
                      🎁 {discount}% OFF
                    </Badge>

                    <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {bundle.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {bundle.description}
                    </p>

                    {/* Book thumbnails */}
                    <div className="flex -space-x-3 mb-4">
                      {books.slice(0, 4).map((book, idx) => (
                        <img
                          key={book!.id}
                          src={book!.cover}
                          alt={book!.title}
                          className="w-10 h-14 object-cover rounded border-2 border-background shadow-sm"
                          style={{ zIndex: books.length - idx }}
                        />
                      ))}
                      {books.length > 4 && (
                        <div className="w-10 h-14 rounded border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                          +{books.length - 4}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">₹{bundle.price}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{bundle.originalPrice}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={(e) => handleAddBundleToCart(bundle, e)}
                        className="gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add Bundle
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      {bundle.bookIds.length} books included
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default DashboardBundles;
