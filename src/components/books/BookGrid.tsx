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
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
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
