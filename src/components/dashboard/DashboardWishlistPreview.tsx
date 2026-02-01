import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, getStockStatus, getAuthorById } from "@/data/mockData";

interface DashboardWishlistPreviewProps {
  books: Book[];
}

const DashboardWishlistPreview = ({ books }: DashboardWishlistPreviewProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-destructive" />
            Your Wishlist
          </CardTitle>
          {books.length > 0 && (
            <Link to="/wishlist">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {books.length > 0 ? (
            <div className="space-y-3">
              {books.slice(0, 4).map((book) => {
                const stockStatus = getStockStatus(book.stock);
                const author = getAuthorById(book.authorId);
                
                return (
                  <Link 
                    key={book.id} 
                    to={`/book/${book.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-14 h-18 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-primary transition-colors">
                        {book.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {author?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary text-sm">₹{book.price}</span>
                        <Badge 
                          variant={stockStatus.color === "success" ? "default" : stockStatus.color === "warning" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Your wishlist is empty</p>
              <Link to="/books">
                <Button variant="link" className="mt-2">
                  Browse books
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default DashboardWishlistPreview;
