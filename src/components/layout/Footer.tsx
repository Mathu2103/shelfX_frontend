import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/60">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="shelfX Logo" className="h-10 w-auto" />
              <span className="font-serif text-xl font-semibold text-foreground">shelfX</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your destination for literary adventures. Discover, explore, and find your next favorite read.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/books" className="hover:text-accent transition-colors">All Books</Link></li>
              <li><Link to="/books?sort=trending" className="hover:text-accent transition-colors">Trending</Link></li>
              <li><Link to="/books?sort=new" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link to="/bundles" className="hover:text-accent transition-colors">Book Bundles</Link></li>
              <li><Link to="/authors" className="hover:text-accent transition-colors">Authors</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Help</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Subscribe for new releases and exclusive offers.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-muted/40 border-border/60 h-10 rounded-full px-4 text-sm"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-10 w-10 shrink-0 p-0">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} shelfX. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
