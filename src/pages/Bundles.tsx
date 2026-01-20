import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bundles, getBookById } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";

const Bundles = () => {
  const { addToCart } = useCart();

  const handleAddBundleToCart = (bundleId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (bundle) {
      bundle.bookIds.forEach(bookId => {
        const book = getBookById(bookId);
        if (book && book.stock > 0) {
          addToCart(book);
        }
      });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Package className="h-5 w-5" />
            <span className="font-medium">Special Offers</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Book Bundles</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Save more when you buy together! Curated collections at special prices.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {bundles.map((bundle, index) => {
            const bundleBooks = bundle.bookIds.map(id => getBookById(id)).filter(Boolean);
            const savings = bundle.originalPrice - bundle.price;
            const savingsPercent = Math.round((savings / bundle.originalPrice) * 100);

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-book-hover transition-all duration-300">
                  {/* Header Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-lg px-3 py-1">
                      Save {savingsPercent}%
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="font-serif text-2xl font-bold text-primary-foreground">
                        {bundle.name}
                      </h2>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{bundle.description}</p>

                    {/* Books in Bundle */}
                    <div className="space-y-3 mb-6">
                      <h3 className="font-medium text-sm text-muted-foreground">Includes:</h3>
                      <div className="flex flex-wrap gap-2">
                        {bundleBooks.map(book => book && (
                          <Link
                            key={book.id}
                            to={`/book/${book.id}`}
                            className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 hover:bg-muted transition-colors"
                          >
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="w-10 h-14 object-cover rounded"
                            />
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{book.title}</p>
                              <p className="text-xs text-muted-foreground">
                                ${book.price.toFixed(2)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-3xl font-bold">
                            ${bundle.price.toFixed(2)}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            ${bundle.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-success font-medium">
                          You save ${savings.toFixed(2)}!
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => handleAddBundleToCart(bundle.id)}
                      >
                        Add to Cart
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {bundles.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold">No Bundles Available</h2>
            <p className="text-muted-foreground mt-2">Check back soon for special offers!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bundles;
