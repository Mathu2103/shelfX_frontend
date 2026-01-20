import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { authors, books } from "@/data/mockData";

const Authors = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Featured Authors</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover the brilliant minds behind your favorite stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author, index) => {
            const authorBooks = books.filter(b => b.authorId === author.id);
            const totalSales = authorBooks.reduce((sum, b) => sum + b.salesCount, 0);

            return (
              <motion.div
                key={author.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/books?author=${author.id}`}>
                  <Card className="group hover:shadow-book-hover transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={author.image}
                          alt={author.name}
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all"
                        />
                        <div className="flex-1">
                          <h2 className="font-serif text-xl font-semibold group-hover:text-accent transition-colors">
                            {author.name}
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {author.bio}
                          </p>
                          <div className="flex gap-4 mt-3 text-sm">
                            <span className="text-muted-foreground">
                              <span className="font-medium text-foreground">{authorBooks.length}</span> books
                            </span>
                            <span className="text-muted-foreground">
                              <span className="font-medium text-foreground">{totalSales.toLocaleString()}</span> sold
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Author's Books Preview */}
                      {authorBooks.length > 0 && (
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          {authorBooks.slice(0, 4).map(book => (
                            <img
                              key={book.id}
                              src={book.cover}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded shadow-sm"
                            />
                          ))}
                          {authorBooks.length > 4 && (
                            <div className="w-12 h-16 bg-muted rounded flex items-center justify-center text-sm font-medium text-muted-foreground">
                              +{authorBooks.length - 4}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Authors;
