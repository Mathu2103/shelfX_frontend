import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="shelfX Logo" className="h-40 w-auto" />
              <span className="font-serif text-3xl font-semibold">shelfX</span>
            </Link>
            <p className="text-sm opacity-80">
              Your destination for literary adventures. Discover, explore, and find your next favorite read.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/books" className="hover:text-accent transition-colors">All Books</Link></li>
              <li><Link to="/books?sort=trending" className="hover:text-accent transition-colors">Trending</Link></li>
              <li><Link to="/books?sort=new" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link to="/bundles" className="hover:text-accent transition-colors">Book Bundles</Link></li>
              <li><Link to="/authors" className="hover:text-accent transition-colors">Authors</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to our newsletter for new releases and exclusive offers.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} shelfX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
