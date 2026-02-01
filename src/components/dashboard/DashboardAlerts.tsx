import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, getStockStatus } from "@/data/mockData";

interface DashboardAlertsProps {
  wishlistBooks: Book[];
}

const DashboardAlerts = ({ wishlistBooks }: DashboardAlertsProps) => {
  // Filter books that need alerts (out of stock or low stock in wishlist)
  const outOfStockBooks = wishlistBooks.filter(book => book.stock === 0);
  const lowStockBooks = wishlistBooks.filter(book => book.stock > 0 && book.stock <= 10);
  const backInStockBooks: Book[] = []; // This would come from API in real implementation

  const hasAlerts = outOfStockBooks.length > 0 || lowStockBooks.length > 0 || backInStockBooks.length > 0;

  if (!hasAlerts) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Bell className="h-5 w-5" />
            Book Availability Alerts
            <Badge variant="secondary" className="ml-2">
              {outOfStockBooks.length + lowStockBooks.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Out of Stock Alerts */}
          {outOfStockBooks.map((book) => (
            <Link 
              key={book.id}
              to={`/book/${book.id}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors"
            >
              <div className="p-2 rounded-full bg-destructive/10">
                <Package className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{book.title}</p>
                <p className="text-xs text-muted-foreground">Currently out of stock</p>
              </div>
              <Badge variant="destructive" className="shrink-0">
                Out of Stock
              </Badge>
            </Link>
          ))}

          {/* Low Stock Alerts */}
          {lowStockBooks.map((book) => (
            <Link 
              key={book.id}
              to={`/book/${book.id}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted transition-colors"
            >
              <div className="p-2 rounded-full bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{book.title}</p>
                <p className="text-xs text-muted-foreground">Only {book.stock} left in stock!</p>
              </div>
              <Badge variant="secondary" className="shrink-0 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                Low Stock
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default DashboardAlerts;
