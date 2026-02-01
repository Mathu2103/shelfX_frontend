import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Book } from "@/data/mockData";

interface RecentlyViewedContextType {
  items: Book[];
  addToRecentlyViewed: (book: Book) => void;
  clearRecentlyViewed: () => void;
}

const STORAGE_KEY = "recently_viewed_books";
const MAX_ITEMS = 5;

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Book[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToRecentlyViewed = (book: Book) => {
    setItems(prev => {
      // Remove if already exists, then add to front
      const filtered = prev.filter(item => item.id !== book.id);
      const updated = [book, ...filtered].slice(0, MAX_ITEMS);
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setItems([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
};
