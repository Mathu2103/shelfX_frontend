import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ShoppingBag, 
  Heart, 
  ShoppingCart, 
  User, 
  LogOut,
  ChevronRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const navItems = [
  { label: "Browse Books", icon: BookOpen, link: "/books", color: "text-primary" },
  { label: "My Orders", icon: ShoppingBag, link: "/orders", color: "text-blue-500" },
  { label: "Wishlist", icon: Heart, link: "/wishlist", color: "text-destructive" },
  { label: "Shopping Cart", icon: ShoppingCart, link: "/cart", color: "text-green-500" },
  { label: "Profile Settings", icon: User, link: "/profile", color: "text-violet-500" },
  { label: "Logout", icon: LogOut, link: "/login", color: "text-muted-foreground" },
];

const DashboardQuickNav = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="text-sm font-medium flex-1 truncate">
                  {item.label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default DashboardQuickNav;
