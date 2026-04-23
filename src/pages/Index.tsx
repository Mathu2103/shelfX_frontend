import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Truck, Shield, Gift, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import { getTrendingBooks, getNewArrivals, getBestSellingBooks, categories, bundles, books, getBookById, getAuthorById } from "@/data/mockData";

const Index = () => {
  const trendingBooks = getTrendingBooks();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellingBooks();
  const featuredBook = trendingBooks[0] ?? books[0];
  const featuredAuthor = featuredBook ? getAuthorById(featuredBook.authorId) : null;

  return (
    <Layout>
      {/* Hero Section - simple, balanced */}
      <section className="bg-muted/30">
        <div className="container py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                New Collection Available
              </span>
              <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                Discover Your Next Literary Adventure
              </h1>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-lg">
                Explore thousands of books across every genre. From timeless classics to the latest bestsellers, your next favorite read awaits.
              </p>

              {/* Search field */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex items-center gap-2 p-1.5 bg-card border border-border/60 rounded-full max-w-md"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by title, author, ISBN..."
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0 shadow-none h-9 text-sm"
                  />
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5 h-9 text-sm">
                  Search
                </Button>
              </form>

              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-muted-foreground">
                <Link to="/books" className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent transition-colors">
                  Browse Collection <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/books?sort=new" className="hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </div>
            </motion.div>

            {/* Right - featured book */}
            {featuredBook && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="grid grid-cols-3 gap-3 items-end max-w-md">
                  {trendingBooks[1] && (
                    <div className="aspect-[2/3] rounded-md overflow-hidden shadow-book mb-6">
                      <img src={trendingBooks[1].cover} alt={trendingBooks[1].title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="col-span-1">
                    <div className="aspect-[2/3] rounded-md overflow-hidden shadow-book-hover bg-card">
                      <img src={featuredBook.cover} alt={featuredBook.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="text-sm font-semibold">{featuredBook.title}</h3>
                      <p className="text-xs text-muted-foreground">{featuredAuthor?.name}</p>
                    </div>
                  </div>
                  {trendingBooks[2] && (
                    <div className="aspect-[2/3] rounded-md overflow-hidden shadow-book mb-6">
                      <img src={trendingBooks[2].cover} alt={trendingBooks[2].title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 border-b border-border/60">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $35" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Gift, title: "Gift Wrapping", desc: "Available on request" },
              { icon: BookOpen, title: "Easy Returns", desc: "30-day guarantee" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers (moved up to mirror the reference order) */}
      <section className="py-20 md:py-24">
        <div className="container">
          <BookGrid
            books={bestSellers}
            title="Best Seller Books"
            subtitle="Our most popular titles, loved by thousands of readers"
          />
          <div className="text-center mt-12">
            <Link to="/books?sort=bestselling">
              <Button variant="outline" size="lg" className="rounded-full border-border/60 hover:border-accent hover:text-accent">
                View All Best Sellers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Your Favorite Books - editorial split */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - book covers grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 max-w-md"
            >
              {bestSellers.slice(0, 4).map((book, i) => (
                <div
                  key={book.id}
                  className="aspect-[2/3] rounded-lg overflow-hidden shadow-book hover:shadow-book-hover transition-shadow"
                  style={{ transform: `translateY(${i % 2 === 0 ? "0" : "1.5rem"})` }}
                >
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>

            {/* Right - copy + stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight">
                Find Your Favorite
                <span className="block">Books Here</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
                We regularly publish a fascinating feature about a huge variety of bookish subjects, publishers, and interesting characters in literature and notable new releases.
              </p>

              <div className="grid grid-cols-3 gap-6 mt-10 max-w-md">
                <div>
                  <div className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{books.length}+</div>
                  <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">Books</div>
                </div>
                <div>
                  <div className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{bestSellers.length * 10}+</div>
                  <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">Best Sellers</div>
                </div>
                <div>
                  <div className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{newArrivals.length * 5}+</div>
                  <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">New Arrivals</div>
                </div>
              </div>

              <Link to="/books">
                <Button className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-11">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">Browse by Category</h2>
            <p className="mt-3 text-muted-foreground">Find your perfect read in any genre</p>
            <div className="mt-5 mx-auto h-px w-12 bg-accent/60" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/books?category=${category.slug}`}
                  className="block p-6 rounded-xl bg-card border border-border/60 hover:border-accent hover:shadow-book transition-all duration-300 text-center group"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{category.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bundle - light promotional band */}
      {bundles[0] && (
        <section className="py-16 md:py-20 bg-muted/40 border-y border-border/60">
          <div className="container">
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium tracking-wide uppercase mb-4">
                  Special Offer
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                  {bundles[0].name}
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
                  {bundles[0].description}
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <span className="font-serif text-3xl font-semibold text-accent">
                    ${bundles[0].price.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ${bundles[0].originalPrice.toFixed(2)}
                  </span>
                  <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    Save ${(bundles[0].originalPrice - bundles[0].price).toFixed(2)}
                  </span>
                </div>
                <Link to="/bundles">
                  <Button className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-7 h-11">
                    Shop the Bundle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="hidden md:flex gap-3"
              >
                {bundles[0].bookIds.slice(0, 3).map((bookId, i) => {
                  const book = getBookById(bookId);
                  return book ? (
                    <div
                      key={bookId}
                      className="w-28 lg:w-32 aspect-[2/3] rounded-lg overflow-hidden shadow-book-hover"
                      style={{ transform: `rotate(${(i - 1) * 4}deg) translateY(${i === 1 ? "-0.5rem" : "0"})` }}
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null;
                })}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Other Books (Trending + New Arrivals as one elegant grid) */}
      <section className="py-20 md:py-24">
        <div className="container">
          <BookGrid
            books={trendingBooks}
            title="Trending Now"
            subtitle="The books everyone's talking about"
          />
          <div className="text-center mt-12">
            <Link to="/books?sort=trending">
              <Button variant="outline" size="lg" className="rounded-full border-border/60 hover:border-accent hover:text-accent">
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container">
          <BookGrid
            books={newArrivals}
            title="New Arrivals"
            subtitle="Fresh additions to our collection"
          />
          <div className="text-center mt-12">
            <Link to="/books?sort=new">
              <Button variant="outline" size="lg" className="rounded-full border-border/60 hover:border-accent hover:text-accent">
                See All New Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience band - immersive */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-border/60 bg-card shadow-card">
            <div className="aspect-[4/3] md:aspect-auto bg-muted/40 relative overflow-hidden">
              <img
                src={bestSellers[0]?.cover ?? featuredBook?.cover}
                alt="Reading experience"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1 text-accent text-xs font-medium uppercase tracking-wider">
                <Star className="h-3 w-3 fill-accent" /> Curated Experience
              </span>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold leading-tight">
                We Provide You The Experience
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Browse the collection of our best-selling and top-trending products, hand-picked for readers who appreciate quality storytelling.
              </p>
              <Link to="/books">
                <Button className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-7 h-11 self-start">
                  See Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-24 bg-muted/40 border-t border-border/60">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">
              Join Our Reading Community
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Subscribe to receive exclusive offers, reading recommendations, and updates on new releases.
            </p>
            <form className="mt-8 flex items-center gap-2 p-1.5 bg-card border border-border/60 rounded-full shadow-card max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-transparent focus:outline-none text-sm"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 h-10">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
