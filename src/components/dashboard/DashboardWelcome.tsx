import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardWelcomeProps {
  userName: string;
  avatarUrl?: string;
}

const motivationalTaglines = [
  "Every book is a new adventure waiting to unfold 📖",
  "Your next favorite read is just a click away ✨",
  "Reading is dreaming with open eyes 🌟",
  "Great stories await you today 📚",
];

const DashboardWelcome = ({ userName, avatarUrl }: DashboardWelcomeProps) => {
  const tagline = motivationalTaglines[Math.floor(Math.random() * motivationalTaglines.length)];
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
    >
      <Avatar className="h-20 w-20 ring-4 ring-primary/20">
        <AvatarImage src={avatarUrl} alt={userName} />
        <AvatarFallback className="text-xl font-serif bg-primary text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-muted-foreground mt-2 text-lg italic">
          {tagline}
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardWelcome;
