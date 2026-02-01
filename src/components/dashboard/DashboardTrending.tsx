import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "@/data/mockData";
import BookCard from "@/components/books/BookCard";

interface DashboardTrendingProps {
  trendingBooks: Book[];
  bestSellingBooks: Book[];
  newArrivals: Book[];
}

const DashboardTrending = ({ trendingBooks, bestSellingBooks, newArrivals }: DashboardTrendingProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Tabs defaultValue="trending" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="trending" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
              🔥 Trending
            </TabsTrigger>
            <TabsTrigger value="bestsellers" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Trophy className="h-4 w-4" />
              🏆 Best Sellers
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="h-4 w-4" />
              🆕 New Arrivals
            </TabsTrigger>
          </TabsList>
          <Link to="/books">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bestsellers" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellingBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.section>
  );
};

export default DashboardTrending;
