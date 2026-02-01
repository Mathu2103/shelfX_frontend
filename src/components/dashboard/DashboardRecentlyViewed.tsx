import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { History, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, getAuthorById } from "@/data/mockData";

interface DashboardRecentlyViewedProps {
  books: Book[];
}

const DashboardRecentlyViewed = ({ books }: DashboardRecentlyViewedProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Continue Browsing
          </CardTitle>
          {books.length > 0 && (
            <Link to="/books">
              <Button variant="ghost" size="sm">
                Browse More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.slice(0, 3).map((book) => {
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
                      className="w-16 h-20 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-primary transition-colors">
                        {book.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {author?.name}
                      </p>
                      <p className="text-sm font-bold text-primary mt-1">₹{book.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No recently viewed books</p>
              <Link to="/books">
                <Button variant="link" className="mt-2">
                  Start exploring
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default DashboardRecentlyViewed;
