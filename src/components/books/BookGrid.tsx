import { Book } from "@/data/mockData";
import BookCard from "./BookCard";

interface BookGridProps {
  books: Book[];
  title?: string;
  subtitle?: string;
}

const BookGrid = ({ books, title, subtitle }: BookGridProps) => {
  return (
    <section>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-5 mx-auto h-px w-12 bg-accent/60" />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {books.map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
