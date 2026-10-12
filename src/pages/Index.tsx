import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  Star, 
  BookOpen, 
  ShoppingBag, 
  Heart, 
  Quote, 
  Sparkles, 
  BookMarked,
  Award,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/books/BookCard";
import { 
  getNewArrivals, 
  getBestSellingBooks, 
  categories, 
  books, 
  getAuthorById 
} from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  const [searchQuery, setSearchQuery] = useState("");
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellingBooks();

  // Find Jane Austen's Pride and Prejudice (Book ID 5)
  const prideAndPrejudice = books.find(b => b.id === "5") ?? books[4];
  const prideAuthor = getAuthorById(prideAndPrejudice.authorId);
  const isPrideInWishlist = isInWishlist(prideAndPrejudice.id);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAddPrideToCart = () => {
    if (prideAndPrejudice.stock > 0) {
      addToCart(prideAndPrejudice);
      toast.success("Added 'Pride and Prejudice' to your cart!", {
        description: "Jane Austen's timeless classic has been added.",
        action: {
          label: "View Cart",
          onClick: () => navigate("/cart")
        }
      });
    } else {
      toast.error("Pride and Prejudice is currently out of stock.");
    }
  };

  return (
    <Layout>
      {/* Premium Hero Section - Minimal White and Vintage Paper vibe */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28 vintage-paper-effect border-b border-border/40">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-card border border-border/80 text-accent rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm mb-6"
            >
              <Sparkles className="h-3 w-3" />
              New Collection Available
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground font-medium tracking-tight leading-[1.1] mb-6"
            >
              Discover Your Next <br />
              <span className="italic text-accent">Literary Adventure</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 font-sans"
            >
              Explore thousands of books across every genre. From timeless classics to the latest bestsellers, your next favorite read awaits.
            </motion.p>

            {/* Elegant Search form */}
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 p-1.5 bg-card border border-border rounded-lg shadow-book max-w-lg mx-auto mb-10 group focus-within:border-accent/40 transition-colors"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <Input
                  type="search"
                  placeholder="Search by title, author, or genre..."
                  className="pl-10 border-0 bg-transparent focus-visible:ring-0 shadow-none h-11 text-sm text-foreground font-sans placeholder:text-muted-foreground/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 h-11 text-sm font-semibold rounded-md shadow-sm transition-all duration-300">
                Search
              </Button>
            </motion.form>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              <Link to="/books">
                <Button variant="outline" size="lg" className="rounded-md border-border bg-card hover:bg-muted font-semibold px-7 h-12 text-sm shadow-sm transition-all duration-300 group">
                  Browse Collection 
                  <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </Button>
              </Link>
              <a href="#new-arrivals" className="font-semibold text-foreground/80 hover:text-accent transition-colors flex items-center gap-1 py-2">
                New Arrivals
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Vintage ornate page divider background elements */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* New Arrivals Section */}
      <section id="new-arrivals" className="py-20 md:py-24 bg-card border-b border-border/40 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase block mb-2 font-sans">
              ❖ Fresh From the Press ❖
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground font-medium mb-3">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto font-sans leading-relaxed">
              Explore the latest additions to our carefully handpicked collection of classical and modern literature.
            </p>
            <div className="w-12 h-[2px] bg-accent/20 mx-auto mt-6" />
          </div>

          {/* Books grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.slice(0, 4).map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/books?sort=new">
              <Button variant="outline" className="border-border hover:border-accent hover:text-accent rounded-md px-6 shadow-sm transition-colors duration-300">
                See All New Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pride and Prejudice Breathtaking Vintage Spotlight Section */}
      <section className="py-20 md:py-24 bg-background vintage-paper-effect border-b border-border/40">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            
            {/* Header / Intro */}
            <div className="text-center mb-14">
              <span className="text-accent text-xs font-semibold tracking-widest uppercase block mb-2 font-sans">
                Masterpiece Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground font-medium">
                Jane Austen's Timeless Classic
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4 text-accent">
                <span className="h-px w-8 bg-accent/30" />
                <span className="text-xs italic font-serif">Pride and Prejudice</span>
                <span className="h-px w-8 bg-accent/30" />
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              
              {/* Left Column: Hand-crafted 3D leatherbound book mockup */}
              <div className="col-span-12 md:col-span-5 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group cursor-pointer"
                  onClick={() => navigate(`/book/${prideAndPrejudice.id}`)}
                >
                  {/* Book 3D Container */}
                  <div className="relative w-64 h-96 bg-[#4A1E1A] rounded-r-md shadow-[12px_16px_36px_-6px_rgba(26,20,18,0.35)] hover:shadow-[16px_20px_42px_-4px_rgba(26,20,18,0.45)] hover:-translate-y-1 transition-all duration-500 overflow-hidden border-y border-r border-[#692923]/40">
                    
                    {/* Spine highlight (Left 3D effect) */}
                    <div className="absolute left-0 top-0 h-full w-3.5 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-20" />
                    <div className="absolute left-3.5 top-0 h-full w-px bg-white/10 z-20" />
                    
                    {/* Inner gold frame (Delicate double borders) */}
                    <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-sm z-10 flex flex-col justify-between p-6">
                      
                      {/* Corner ornate diamonds */}
                      <div className="absolute top-1 left-1 text-[8px] text-[#D4AF37]/60">❖</div>
                      <div className="absolute top-1 right-1 text-[8px] text-[#D4AF37]/60">❖</div>
                      <div className="absolute bottom-1 left-1 text-[8px] text-[#D4AF37]/60">❖</div>
                      <div className="absolute bottom-1 right-1 text-[8px] text-[#D4AF37]/60">❖</div>
                      
                      {/* Inner gold line */}
                      <div className="absolute inset-1 border border-[#D4AF37]/35 rounded-sm pointer-events-none" />

                      {/* Header elements on cover */}
                      <div className="text-center mt-6">
                        <div className="text-[10px] text-[#D4AF37]/80 uppercase tracking-[0.2em] font-sans">
                          Penguin Classics
                        </div>
                        <div className="w-8 h-px bg-[#D4AF37]/45 mx-auto mt-2" />
                      </div>

                      {/* Book Title Gilded */}
                      <div className="text-center my-auto flex flex-col items-center justify-center gap-1.5">
                        <span className="text-2xl font-serif text-[#D4AF37] font-medium tracking-[0.1em] leading-tight">
                          PRIDE
                        </span>
                        <span className="text-xs italic font-serif text-[#D4AF37]/80">
                          &amp;
                        </span>
                        <span className="text-2xl font-serif text-[#D4AF37] font-medium tracking-[0.1em] leading-tight">
                          PREJUDICE
                        </span>
                      </div>

                      {/* Author and Gold Emblem */}
                      <div className="text-center mb-6">
                        <div className="w-6 h-6 rounded-full border border-[#D4AF37]/45 mx-auto mb-4 flex items-center justify-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30" />
                        </div>
                        <div className="text-xs font-serif text-[#D4AF37]/90 uppercase tracking-[0.15em] font-medium">
                          Jane Austen
                        </div>
                      </div>
                    </div>

                    {/* Subtle leather-like paper grain overlay */}
                    <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/5 pointer-events-none" />
                  </div>
                  
                  {/* Subtle shadows under book */}
                  <div className="absolute bottom-[-10px] left-4 right-4 h-4 bg-black/15 blur-md rounded-full -z-10" />
                </motion.div>
              </div>

              {/* Right Column: Editorial copy and description */}
              <div className="col-span-12 md:col-span-7 space-y-6">
                
                {/* Category & Badge */}
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 border border-accent/30 text-accent font-sans text-[10px] tracking-widest font-semibold uppercase rounded-sm">
                    Romantic Fiction
                  </span>
                  <div className="flex items-center text-amber-500 gap-0.5 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    <span className="text-muted-foreground ml-1.5 text-xs font-sans font-medium">(12,500 reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-4xl font-serif text-foreground font-medium leading-tight">
                    Pride and Prejudice
                  </h3>
                  <p className="text-accent/90 italic font-serif text-sm mt-1">
                    By {prideAuthor?.name || "Jane Austen"}
                  </p>
                </div>

                {/* Classic Quote box */}
                <div className="relative border-l-2 border-accent/40 pl-5 py-2.5 my-4 bg-card/45 rounded-r-md">
                  <Quote className="absolute right-4 top-2 h-10 w-10 text-accent/5 pointer-events-none" />
                  <p className="font-serif italic text-foreground/80 text-[15px] sm:text-base leading-relaxed">
                    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."
                  </p>
                </div>

                {/* Paragraph Description */}
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  {prideAndPrejudice.description} Discover Jane Austen’s sparkling comedy of manners and romance in Georgian England, following the sparkling wit of Elizabeth Bennet and her tumultuous encounters with the proud, aristocratic master of Pemberley, Mr. Fitzwilliam Darcy.
                </p>

                {/* Editorial Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-border/80 bg-card rounded-md shadow-sm text-center">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Publisher</span>
                    <span className="text-xs font-semibold text-foreground font-sans mt-0.5 block">{prideAndPrejudice.publisher || "Penguin Classics"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Length</span>
                    <span className="text-xs font-semibold text-foreground font-sans mt-0.5 block">{prideAndPrejudice.pages || 432} Pages</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Language</span>
                    <span className="text-xs font-semibold text-foreground font-sans mt-0.5 block">{prideAndPrejudice.language || "English"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Special Price</span>
                    <span className="text-sm font-bold text-accent font-serif mt-0.5 block">${prideAndPrejudice.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Button 
                    onClick={handleAddPrideToCart}
                    disabled={prideAndPrejudice.stock === 0}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 rounded-md text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {prideAndPrejudice.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  
                  <Link to={`/book/${prideAndPrejudice.id}`} className="flex-1 sm:flex-initial">
                    <Button 
                      variant="outline"
                      className="border-border hover:bg-muted h-11 px-6 rounded-md text-sm font-semibold w-full"
                    >
                      Learn More &amp; Read Review
                    </Button>
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 md:py-24 bg-card border-b border-border/40">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase block mb-2 font-sans">
              ❖ Reader Favorites ❖
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground font-medium mb-3">
              Best Seller Books
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto font-sans leading-relaxed">
              Discover the most beloved titles in our bookshop, chosen and highly rated by bookworms worldwide.
            </p>
            <div className="w-12 h-[2px] bg-accent/20 mx-auto mt-6" />
          </div>

          {/* Book Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestSellers.map((book, index) => (
              <BookCard key={book.id} book={book} index={index + 4} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/books?sort=bestselling">
              <Button variant="outline" className="border-border hover:border-accent hover:text-accent rounded-md px-6 shadow-sm">
                View All Best Sellers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-20 md:py-24 bg-background vintage-paper-effect border-b border-border/40">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase block mb-2 font-sans">
              ❖ Tailored Genres ❖
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground font-medium mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto font-sans leading-relaxed">
              Fine literature, epic magic, or thrilling suspense. Select a category to reveal your next read.
            </p>
            <div className="w-12 h-[2px] bg-accent/20 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  to={`/books?category=${cat.slug}`}
                  className="block p-6 rounded-md bg-card border border-border/80 hover:border-accent/40 shadow-sm hover:shadow-book transition-all duration-300 text-center group"
                >
                  <h3 className="text-base font-serif text-foreground group-hover:text-accent font-medium transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 font-sans font-normal leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Features Banner */}
      <section className="py-14 bg-card border-b border-border/40">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground">Curated Selection</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Every title on our virtual shelf is hand-selected for premium literary value and story excellence.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground">Exquisite Quality</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Enjoy fine prints, beautiful digital renderings, and meticulously checked publisher versions.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
                <BookMarked className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground">Reading Community</h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Join our members in book clubs, reviews, collections, and exclusive discount bundles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Elegant Newsletter */}
      <section className="py-20 md:py-24 bg-background vintage-paper-effect">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="text-[10px] text-accent font-semibold tracking-[0.25em] uppercase block font-sans">
              ❖ shelfX Newsletter ❖
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground font-medium">
              Join Our Reading Community
            </h2>
            <p className="text-muted-foreground text-sm font-sans max-w-md mx-auto leading-relaxed">
              Subscribe to receive exclusive offers, hand-picked classic recommendations, and early access to vintage releases.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed to the shelfX reading community!"); }} className="flex flex-col sm:flex-row items-center gap-2 p-1 bg-card border border-border rounded-lg shadow-sm max-w-md mx-auto mt-4">
              <input
                required
                type="email"
                placeholder="Enter your literary email..."
                className="w-full px-4 py-2.5 bg-transparent border-0 focus:outline-none text-sm font-sans placeholder:text-muted-foreground/75"
              />
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto px-6 h-10 text-sm font-semibold transition-all">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
