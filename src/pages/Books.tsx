import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { books, categories, authors } from "@/data/mockData";

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "new", label: "New Arrivals" },
  { value: "bestselling", label: "Best Selling" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "trending";
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(query) ||
          authors.find(a => a.id === book.authorId)?.name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter) {
      const category = categories.find(c => c.slug === categoryFilter);
      if (category) {
        result = result.filter(book => book.categoryId === category.id);
      }
    }

    // Author filter
    if (selectedAuthors.length > 0) {
      result = result.filter(book => selectedAuthors.includes(book.authorId));
    }

    // Price filter
    result = result.filter(
      book => book.price >= priceRange.min && book.price <= priceRange.max
    );

    // Stock filter
    if (inStockOnly) {
      result = result.filter(book => book.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case "trending":
        result.sort((a, b) => (b.salesCount + b.viewCount) - (a.salesCount + a.viewCount));
        break;
      case "new":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "bestselling":
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, categoryFilter, sortBy, selectedAuthors, priceRange, inStockOnly]);

  const handleSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (slug: string) => {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  const toggleAuthor = (authorId: string) => {
    setSelectedAuthors(prev =>
      prev.includes(authorId)
        ? prev.filter(id => id !== authorId)
        : [...prev, authorId]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              !categoryFilter ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                categoryFilter === cat.slug ? "bg-accent text-accent-foreground" : "hover:bg-muted"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Authors */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-3">Authors</h3>
        <div className="space-y-2">
          {authors.map(author => (
            <label key={author.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedAuthors.includes(author.id)}
                onCheckedChange={() => toggleAuthor(author.id)}
              />
              <span className="text-sm">{author.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={e => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
            className="w-20"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={e => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
            className="w-20"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-serif text-lg font-semibold mb-3">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <span className="text-sm">In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">
            {categoryFilter
              ? categories.find(c => c.slug === categoryFilter)?.name || "Books"
              : searchQuery
              ? `Search: "${searchQuery}"`
              : "All Books"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {filteredBooks.length} books found
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b">
              <div className="flex items-center gap-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredBooks.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-xl text-muted-foreground">No books found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters or search terms
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Books;
