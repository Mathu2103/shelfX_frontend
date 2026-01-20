import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingCart,
  Package,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { books, getAuthorById, categories, getStockStatus } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
  { icon: BookOpen, label: "Books", value: "books" },
  { icon: Tag, label: "Categories", value: "categories" },
  { icon: Users, label: "Authors", value: "authors" },
  { icon: Package, label: "Bundles", value: "bundles" },
  { icon: ShoppingCart, label: "Orders", value: "orders" },
  { icon: Users, label: "Customers", value: "customers" },
  { icon: BarChart3, label: "Analytics", value: "analytics" },
  { icon: Settings, label: "Settings", value: "settings" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalRevenue = books.reduce((sum, book) => sum + book.price * book.salesCount, 0);
  const totalOrders = books.reduce((sum, book) => sum + book.salesCount, 0);
  const lowStockBooks = books.filter(book => book.stock > 0 && book.stock <= 10);
  const outOfStockBooks = books.filter(book => book.stock === 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${(totalRevenue / 1000).toFixed(1)}K`,
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Total Books",
      value: books.length,
      change: "+3",
      trend: "up",
      icon: BookOpen,
    },
    {
      title: "Low Stock Alerts",
      value: lowStockBooks.length + outOfStockBooks.length,
      change: outOfStockBooks.length > 0 ? `${outOfStockBooks.length} out of stock` : "All good",
      trend: outOfStockBooks.length > 0 ? "down" : "up",
      icon: AlertCircle,
    },
  ];

  const topSellingBooks = [...books].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-sidebar-primary" />
            <span className="font-serif text-xl font-semibold text-sidebar-foreground">
              Bookshire
            </span>
          </Link>
          <span className="text-xs text-sidebar-foreground/60 mt-1 block">Admin Panel</span>
        </div>

        <nav className="px-3 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors",
                activeTab === item.value
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Book
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="font-serif text-3xl font-bold mt-1">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span
                            className={cn(
                              "text-sm",
                              stat.trend === "up" ? "text-success" : "text-destructive"
                            )}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Top Selling Books */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Top Selling Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSellingBooks.map(book => {
                        const author = getAuthorById(book.authorId);
                        const stockStatus = getStockStatus(book.stock);
                        return (
                          <TableRow key={book.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={book.cover}
                                  alt={book.title}
                                  className="w-10 h-14 object-cover rounded"
                                />
                                <span className="font-medium line-clamp-1">{book.title}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {author?.name}
                            </TableCell>
                            <TableCell>{book.salesCount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  stockStatus.color === "success"
                                    ? "default"
                                    : stockStatus.color === "warning"
                                    ? "secondary"
                                    : "destructive"
                                }
                                className={cn(
                                  stockStatus.color === "success" &&
                                    "bg-success text-success-foreground"
                                )}
                              >
                                {book.stock}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              ${(book.price * book.salesCount).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              {/* Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Stock Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[...outOfStockBooks, ...lowStockBooks].slice(0, 4).map(book => {
                    const stockStatus = getStockStatus(book.stock);
                    return (
                      <div key={book.id} className="flex items-center gap-3">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{book.title}</p>
                          <Badge
                            variant={
                              stockStatus.color === "destructive" ? "destructive" : "secondary"
                            }
                            className="mt-1"
                          >
                            {stockStatus.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  {[...outOfStockBooks, ...lowStockBooks].length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      All stock levels are healthy!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.slice(0, 6).map(cat => {
                      const count = books.filter(b => b.categoryId === cat.id).length;
                      return (
                        <div key={cat.id} className="flex items-center justify-between">
                          <span className="text-sm">{cat.name}</span>
                          <Badge variant="secondary">{count} books</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
