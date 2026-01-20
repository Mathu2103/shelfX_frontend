import { Book } from "@/data/mockData";
import BookCard from "./BookCard";

interface BookGridProps {
  books: Book[];
  title?: string;
  subtitle?: string;
}

const BookGrid = ({ books, title, subtitle }: BookGridProps) => {
  return (
    <section className="py-12">
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
