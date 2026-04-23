import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";
import { categories } from "@/data/mockData";

const Header = () => {
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinkClass =
    "text-sm font-medium text-foreground/70 hover:text-accent transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={logo}
            alt="shelfX Logo"
            className="h-10 w-auto transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-semibold text-foreground tracking-tight">
            shelfX
          </span>
        </Link>

        {/* Desktop Navigation - centered */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/books" className={navLinkClass}>Books</Link>
          <div className="relative group">
            <button className={navLinkClass}>Categories</button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-card rounded-lg shadow-book border border-border/60 p-3 min-w-[260px] grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/books?category=${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-accent hover:bg-muted px-3 py-2 rounded-md transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/authors" className={navLinkClass}>Authors</Link>
          <Link to="/bundles" className={navLinkClass}>Bundles</Link>
          <Link to="/dashboard" className={navLinkClass}>Dashboard</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <form onSubmit={handleSearch} className="hidden xl:flex mr-2">
            <div className="relative w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-9 h-9 bg-muted/40 border-border/60 rounded-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Heart className="h-5 w-5" />
              {wishlistItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-0">
                  {wishlistItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-0">
                  {cartItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
                <nav className="flex flex-col gap-1">
                  <Link to="/" className="px-4 py-2 hover:bg-muted rounded-md text-sm">Home</Link>
                  <Link to="/books" className="px-4 py-2 hover:bg-muted rounded-md text-sm">All Books</Link>
                  <Link to="/authors" className="px-4 py-2 hover:bg-muted rounded-md text-sm">Authors</Link>
                  <Link to="/bundles" className="px-4 py-2 hover:bg-muted rounded-md text-sm">Bundles</Link>
                  <Link to="/dashboard" className="px-4 py-2 hover:bg-muted rounded-md text-sm">My Dashboard</Link>
                  <Link to="/login" className="px-4 py-2 hover:bg-muted rounded-md text-sm">Sign In</Link>
                </nav>
                <div className="border-t border-border/60 pt-4">
                  <h3 className="text-sm font-semibold mb-2 px-4">Categories</h3>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/books?category=${cat.slug}`}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-muted rounded-md"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
