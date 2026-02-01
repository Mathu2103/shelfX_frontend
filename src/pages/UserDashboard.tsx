import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { 
  getTrendingBooks, 
  getBestSellingBooks, 
  getNewArrivals, 
  bundles, 
  books 
} from "@/data/mockData";
import {
  DashboardWelcome,
  DashboardStats,
  DashboardRecommended,
  DashboardTrending,
  DashboardRecentlyViewed,
  DashboardWishlistPreview,
  DashboardAlerts,
  DashboardBundles,
  DashboardQuickNav,
} from "@/components/dashboard";

const UserDashboard = () => {
  const { items: cartItems, totalItems: cartCount } = useCart();
  const { items: wishlistItems, totalItems: wishlistCount } = useWishlist();
  const { items: recentlyViewedItems } = useRecentlyViewed();
  
  // Fetch book data
  const trendingBooks = getTrendingBooks();
  const bestSellingBooks = getBestSellingBooks();
  const newArrivals = getNewArrivals();
  
  // Get wishlist category IDs for recommendations
  const wishlistCategoryIds = [...new Set(wishlistItems.map(book => book.categoryId))];
  
  // Get recommended books (based on wishlist categories or fallback to trending)
  const recommendedBooks = wishlistCategoryIds.length > 0
    ? books.filter(book => 
        wishlistCategoryIds.includes(book.categoryId) && 
        !wishlistItems.find(w => w.id === book.id)
      ).slice(0, 8)
    : trendingBooks;

  // Mock user data (will come from Auth API)
  const user = {
    name: "John",
    avatarUrl: undefined,
    ordersCount: 5,
  };

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        {/* 1. Welcome & Profile Summary */}
        <DashboardWelcome 
          userName={user.name} 
          avatarUrl={user.avatarUrl} 
        />

        {/* 2. Quick Activity Overview (Stats Cards) */}
        <DashboardStats 
          ordersCount={user.ordersCount}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
        />

        {/* 3. Recommended for You */}
        <DashboardRecommended 
          books={recommendedBooks}
          wishlistCategoryIds={wishlistCategoryIds}
        />

        {/* 4. Trending, Best Sellers, New Arrivals (Tabs) */}
        <DashboardTrending 
          trendingBooks={trendingBooks}
          bestSellingBooks={bestSellingBooks}
          newArrivals={newArrivals}
        />

        {/* 5. Recently Viewed / Continue Browsing */}
        <DashboardRecentlyViewed books={recentlyViewedItems} />

        {/* Two Column Layout for Wishlist & Alerts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 6. Wishlist Preview */}
          <DashboardWishlistPreview books={wishlistItems} />

          {/* 7. Book Availability Alerts */}
          <DashboardAlerts wishlistBooks={wishlistItems} />
        </div>

        {/* 8. Book Bundles & Special Offers */}
        <DashboardBundles bundles={bundles} />

        {/* 9. Quick Navigation Menu */}
        <DashboardQuickNav />
      </div>
    </Layout>
  );
};

export default UserDashboard;
