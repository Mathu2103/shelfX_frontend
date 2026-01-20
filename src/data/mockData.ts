// Mock data for the bookshop

export interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Book {
  id: string;
  title: string;
  authorId: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  cover: string;
  description: string;
  stock: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  viewCount: number;
  createdAt: string;
  isbn: string;
  pages: number;
  publisher: string;
  language: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  bookIds: string[];
  price: number;
  originalPrice: number;
  image: string;
}

export const categories: Category[] = [
  { id: "1", name: "Children", slug: "children", description: "Books for young readers" },
  { id: "2", name: "Fantasy", slug: "fantasy", description: "Magical worlds and epic adventures" },
  { id: "3", name: "Thriller", slug: "thriller", description: "Suspense and mystery" },
  { id: "4", name: "Ancient", slug: "ancient", description: "Historical and classical literature" },
  { id: "5", name: "Romance", slug: "romance", description: "Love stories and relationships" },
  { id: "6", name: "Science Fiction", slug: "sci-fi", description: "Future worlds and technology" },
  { id: "7", name: "Biography", slug: "biography", description: "Life stories of remarkable people" },
  { id: "8", name: "Self-Help", slug: "self-help", description: "Personal development and growth" },
];

export const authors: Author[] = [
  { id: "1", name: "J.K. Rowling", bio: "British author best known for the Harry Potter series", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { id: "2", name: "Stephen King", bio: "American author of horror, supernatural fiction", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
  { id: "3", name: "Agatha Christie", bio: "British writer known for detective novels", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { id: "4", name: "George R.R. Martin", bio: "American novelist and short story writer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { id: "5", name: "Jane Austen", bio: "English novelist known for romantic fiction", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" },
  { id: "6", name: "Isaac Asimov", bio: "American author and professor of biochemistry", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    authorId: "1",
    categoryId: "2",
    price: 18.99,
    originalPrice: 24.99,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    description: "Between life and death there is a library, and within that library, the shelves go on forever.",
    stock: 45,
    rating: 4.8,
    reviewCount: 2341,
    salesCount: 15420,
    viewCount: 45000,
    createdAt: "2024-01-15",
    isbn: "978-0-525-55947-4",
    pages: 304,
    publisher: "Viking",
    language: "English"
  },
  {
    id: "2",
    title: "The Silent Patient",
    authorId: "3",
    categoryId: "3",
    price: 16.99,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    description: "A shocking psychological thriller of a woman's act of violence against her husband.",
    stock: 32,
    rating: 4.6,
    reviewCount: 1892,
    salesCount: 12300,
    viewCount: 38000,
    createdAt: "2024-02-20",
    isbn: "978-1-250-30169-7",
    pages: 336,
    publisher: "Celadon Books",
    language: "English"
  },
  {
    id: "3",
    title: "Where the Wild Things Are",
    authorId: "1",
    categoryId: "1",
    price: 12.99,
    originalPrice: 15.99,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
    description: "A timeless classic about imagination and the wild things within us all.",
    stock: 78,
    rating: 4.9,
    reviewCount: 5621,
    salesCount: 28000,
    viewCount: 62000,
    createdAt: "2023-12-01",
    isbn: "978-0-06-025492-6",
    pages: 48,
    publisher: "Harper Collins",
    language: "English"
  },
  {
    id: "4",
    title: "A Game of Thrones",
    authorId: "4",
    categoryId: "2",
    price: 22.99,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description: "Winter is coming. The epic fantasy that started it all.",
    stock: 0,
    rating: 4.7,
    reviewCount: 8934,
    salesCount: 45000,
    viewCount: 120000,
    createdAt: "2023-06-15",
    isbn: "978-0-553-10354-0",
    pages: 694,
    publisher: "Bantam Books",
    language: "English"
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    authorId: "5",
    categoryId: "5",
    price: 11.99,
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400",
    description: "The classic tale of love and misunderstanding in Georgian England.",
    stock: 56,
    rating: 4.8,
    reviewCount: 12500,
    salesCount: 52000,
    viewCount: 98000,
    createdAt: "2023-08-10",
    isbn: "978-0-14-143951-8",
    pages: 432,
    publisher: "Penguin Classics",
    language: "English"
  },
  {
    id: "6",
    title: "Foundation",
    authorId: "6",
    categoryId: "6",
    price: 15.99,
    originalPrice: 19.99,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    description: "The epic saga of the Foundation that spans the galaxy.",
    stock: 23,
    rating: 4.5,
    reviewCount: 3421,
    salesCount: 18000,
    viewCount: 42000,
    createdAt: "2024-01-05",
    isbn: "978-0-553-29335-7",
    pages: 255,
    publisher: "Bantam Spectra",
    language: "English"
  },
  {
    id: "7",
    title: "The Shining",
    authorId: "2",
    categoryId: "3",
    price: 14.99,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
    description: "A masterpiece of modern horror from the king of the genre.",
    stock: 41,
    rating: 4.6,
    reviewCount: 6789,
    salesCount: 32000,
    viewCount: 78000,
    createdAt: "2023-10-31",
    isbn: "978-0-307-74365-1",
    pages: 447,
    publisher: "Anchor",
    language: "English"
  },
  {
    id: "8",
    title: "Murder on the Orient Express",
    authorId: "3",
    categoryId: "3",
    price: 13.99,
    originalPrice: 16.99,
    cover: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=400",
    description: "Hercule Poirot's most famous case aboard the legendary train.",
    stock: 5,
    rating: 4.7,
    reviewCount: 4532,
    salesCount: 25000,
    viewCount: 55000,
    createdAt: "2024-03-01",
    isbn: "978-0-06-269366-2",
    pages: 256,
    publisher: "William Morrow",
    language: "English"
  },
];

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "Mystery Lovers Collection",
    description: "Three bestselling thrillers that will keep you on the edge of your seat",
    bookIds: ["2", "7", "8"],
    price: 39.99,
    originalPrice: 45.97,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"
  },
  {
    id: "2",
    name: "Fantasy Epic Bundle",
    description: "Escape to magical worlds with these fantasy favorites",
    bookIds: ["1", "4"],
    price: 36.99,
    originalPrice: 47.98,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600"
  },
];

// Helper functions
export const getBookById = (id: string) => books.find(b => b.id === id);
export const getAuthorById = (id: string) => authors.find(a => a.id === id);
export const getCategoryById = (id: string) => categories.find(c => c.id === id);
export const getBooksByCategory = (categoryId: string) => books.filter(b => b.categoryId === categoryId);
export const getBooksByAuthor = (authorId: string) => books.filter(b => b.authorId === authorId);

export const getTrendingBooks = () => 
  [...books].sort((a, b) => (b.salesCount + b.viewCount) - (a.salesCount + a.viewCount)).slice(0, 4);

export const getBestSellingBooks = () => 
  [...books].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);

export const getNewArrivals = () => 
  [...books].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

export const getStockStatus = (stock: number) => {
  if (stock === 0) return { label: "Out of Stock", color: "destructive" as const };
  if (stock <= 10) return { label: "Low Stock", color: "warning" as const };
  return { label: "In Stock", color: "success" as const };
};
