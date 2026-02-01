import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  Sparkles, 
  Package,
  ArrowRight,
  BookOpen
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getTrendingBooks, getNewArrivals, bundles } from "@/data/mockData";
import BookCard from "@/components/books/BookCard";

const UserDashboard = () => {
  const { items: cartItems, totalItems: cartCount } = useCart();
  const { items: wishlistItems, totalItems: wishlistCount } = useWishlist();
  
  const trendingBooks = getTrendingBooks();
  const newArrivals = getNewArrivals();
  
  // Mock user data (will come from Auth API)
  const user = {
    name: "John",
    ordersCount: 5,
  };

  const stats = [
    { 
      label: "Orders", 
      value: user.ordersCount, 
      icon: ShoppingBag, 
      color: "bg-primary/10 text-primary",
      link: "/orders"
    },
    { 
      label: "Wishlist", 
      value: wishlistCount, 
      icon: Heart, 
      color: "bg-accent/20 text-accent-foreground",
      link: "/wishlist"
    },
    { 
      label: "Cart Items", 
      value: cartCount, 
      icon: ShoppingCart, 
      color: "bg-secondary text-secondary-foreground",
      link: "/cart"
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your reading journey
          </p>
        </motion.div>

        {/* Activity Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {stats.map((stat, index) => (
            <Link key={stat.label} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>

        {/* Trending Books Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-2xl font-bold">Trending Now</h2>
            </div>
            <Link to="/books?sort=trending">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </motion.section>

        {/* New Arrivals Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="font-serif text-2xl font-bold">New Arrivals</h2>
            </div>
            <Link to="/books?sort=newest">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Wishlist Preview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  Your Wishlist
                </CardTitle>
                <Link to="/wishlist">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {wishlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistItems.slice(0, 3).map((book) => (
                      <Link 
                        key={book.id} 
                        to={`/book/${book.id}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <img 
                          src={book.cover} 
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{book.title}</p>
                          <p className="text-sm text-muted-foreground">₹{book.price}</p>
                        </div>
                      </Link>
                    ))}
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

          {/* Bundles & Offers */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Special Bundles
                </CardTitle>
                <Link to="/bundles">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bundles.slice(0, 2).map((bundle) => {
                    const discount = Math.round(
                      ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
                    );
                    return (
                      <Link 
                        key={bundle.id}
                        to="/bundles"
                        className="block p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{bundle.name}</h3>
                          <Badge variant="secondary" className="bg-accent/20">
                            {discount}% OFF
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {bundle.bookIds.length} books included
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">₹{bundle.price}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{bundle.originalPrice}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
