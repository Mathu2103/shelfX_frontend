import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Truck, Shield, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import { getTrendingBooks, getNewArrivals, getBestSellingBooks, categories, bundles, books, getBookById } from "@/data/mockData";
import heroImage from "@/assets/hero-books.jpg";

const Index = () => {
  const trendingBooks = getTrendingBooks();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellingBooks();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Bookshop atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>
        
        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              ✨ New Collection Available
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Discover Your Next
              <span className="text-gradient-gold block">Literary Adventure</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-lg">
              Explore thousands of books across every genre. From timeless classics to the latest bestsellers, your next favorite read awaits.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/books">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8">
                  Browse Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/books?sort=new">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Find your perfect read in any genre</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/books?category=${category.slug}`}
                  className="block p-6 rounded-lg bg-card border hover:border-accent hover:shadow-book transition-all duration-300 text-center group"
                >
                  <h3 className="font-serif text-lg font-semibold group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Books */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <BookGrid
            books={trendingBooks}
            title="Trending Now"
            subtitle="The books everyone's talking about"
          />
          <div className="text-center mt-8">
            <Link to="/books?sort=trending">
              <Button variant="outline" size="lg">
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container">
          <BookGrid
            books={newArrivals}
            title="New Arrivals"
            subtitle="Fresh additions to our collection"
          />
          <div className="text-center mt-8">
            <Link to="/books?sort=new">
              <Button variant="outline" size="lg">
                See All New Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bundle */}
      {bundles[0] && (
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
                  Special Offer
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  {bundles[0].name}
                </h2>
                <p className="mt-4 text-primary-foreground/80">
                  {bundles[0].description}
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-4xl font-serif font-bold text-accent">
                    ${bundles[0].price.toFixed(2)}
                  </span>
                  <span className="text-xl text-primary-foreground/60 line-through">
                    ${bundles[0].originalPrice.toFixed(2)}
                  </span>
                  <span className="px-2 py-1 bg-accent/20 text-accent rounded text-sm font-medium">
                    Save ${(bundles[0].originalPrice - bundles[0].price).toFixed(2)}
                  </span>
                </div>
                <Link to="/bundles">
                  <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                    View Bundle
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4"
              >
                {bundles[0].bookIds.slice(0, 3).map((bookId, i) => {
                  const book = getBookById(bookId);
                  return book ? (
                    <div
                      key={bookId}
                      className="aspect-[2/3] rounded-lg overflow-hidden shadow-book"
                      style={{ transform: `rotate(${(i - 1) * 5}deg)` }}
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

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container">
          <BookGrid
            books={bestSellers}
            title="Best Sellers"
            subtitle="Our most popular titles of all time"
          />
          <div className="text-center mt-8">
            <Link to="/books?sort=bestselling">
              <Button variant="outline" size="lg">
                View All Best Sellers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Join Our Reading Community
            </h2>
            <p className="mt-4 text-muted-foreground">
              Subscribe to receive exclusive offers, reading recommendations, and updates on new releases.
            </p>
            <form className="mt-8 flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6">
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
