import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, ShoppingCart, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  link: string;
}

interface DashboardStatsProps {
  ordersCount: number;
  wishlistCount: number;
  cartCount: number;
}

const DashboardStats = ({ ordersCount, wishlistCount, cartCount }: DashboardStatsProps) => {
  const stats: StatItem[] = [
    { 
      label: "Total Orders", 
      value: ordersCount, 
      icon: ShoppingBag, 
      color: "bg-primary/10 text-primary",
      link: "/orders"
    },
    { 
      label: "Wishlist Items", 
      value: wishlistCount, 
      icon: Heart, 
      color: "bg-destructive/10 text-destructive",
      link: "/wishlist"
    },
    { 
      label: "Cart Items", 
      value: cartCount, 
      icon: ShoppingCart, 
      color: "bg-secondary text-secondary-foreground",
      link: "/cart"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {stats.map((stat, index) => (
        <Link key={stat.label} to={stat.link}>
          <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`p-4 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </motion.div>
  );
};

export default DashboardStats;
