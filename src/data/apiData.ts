import { authorsApi, categoriesApi, booksApi, bundlesApi } from '../services/api';

// Types (keeping the same interfaces)
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
  author_id: string;
  category_id: string;
  price: number;
  original_price?: number;
  cover: string;
  description: string;
  stock: number;
  rating: number;
  review_count: number;
  sales_count: number;
  view_count: number;
  created_at: string;
  isbn: string;
  pages: number;
  publisher: string;
  language: string;
  author?: Author;
  category?: Category;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  books?: Book[];
  price: number;
  original_price: number;
  image: string;
}

// API Service functions
export const getAuthors = async (): Promise<Author[]> => {
  const response = await authorsApi.getAll();
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await categoriesApi.getAll();
  return response.data;
};

export const getBooks = async (params?: any): Promise<Book[]> => {
  const response = await booksApi.getAll(params);
  return response.data;
};

export const getBundles = async (): Promise<Bundle[]> => {
  const response = await bundlesApi.getAll();
  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await booksApi.getById(id);
  return response.data;
};

export const getAuthorById = async (id: string): Promise<Author> => {
  const response = await authorsApi.getById(id);
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await categoriesApi.getById(id);
  return response.data;
};

export const getBundleById = async (id: string): Promise<Bundle> => {
  const response = await bundlesApi.getById(id);
  return response.data;
};

// Helper functions that work with async data
export const getBooksByCategory = async (categoryId: string): Promise<Book[]> => {
  return getBooks({ category_id: categoryId });
};

export const getBooksByAuthor = async (authorId: string): Promise<Book[]> => {
  return getBooks({ author_id: authorId });
};

export const getTrendingBooks = async (): Promise<Book[]> => {
  const books = await getBooks({ sort_by: 'view_count', sort_order: 'desc' });
  return books.slice(0, 4);
};

export const getBestSellingBooks = async (): Promise<Book[]> => {
  const books = await getBooks({ sort_by: 'sales_count', sort_order: 'desc' });
  return books.slice(0, 4);
};

export const getNewArrivals = async (): Promise<Book[]> => {
  const books = await getBooks({ sort_by: 'created_at', sort_order: 'desc' });
  return books.slice(0, 4);
};

export const getStockStatus = (stock: number) => {
  if (stock === 0) return { label: "Out of Stock", color: "destructive" as const };
  if (stock <= 10) return { label: "Low Stock", color: "warning" as const };
  return { label: "In Stock", color: "success" as const };
};
