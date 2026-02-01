import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Book, getAuthorById } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface DashboardRecommendedProps {
  books: Book[];
  wishlistCategoryIds: string[];
}

const DashboardRecommended = ({ books }: DashboardRecommendedProps) => {
  if (books.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold">Recommended for You</h2>
        </div>
        <Link to="/books">
          <Button variant="ghost" size="sm">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex gap-4 pb-4">
          {books.map((book) => {
            const author = getAuthorById(book.authorId);
            const hasDiscount = book.originalPrice && book.originalPrice > book.price;
            
            return (
              <Link 
                key={book.id} 
                to={`/book/${book.id}`}
                className="shrink-0 w-[180px] group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-[240px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {hasDiscount && (
                    <Badge className="absolute top-2 right-2 bg-destructive">
                      {Math.round(((book.originalPrice! - book.price) / book.originalPrice!) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {author?.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">₹{book.price}</span>
                    {hasDiscount && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{book.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.section>
  );
};

export default DashboardRecommended;
