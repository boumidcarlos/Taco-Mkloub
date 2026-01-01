import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { MenuItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-card">
        <div className="relative h-48 overflow-hidden group">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground text-4xl opacity-20 font-display">
                {item.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="font-bold text-primary text-lg">
              {item.price} DT
            </span>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl font-bold font-display leading-tight">
              {item.name}
            </CardTitle>
          </div>
          <CardDescription className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {item.category}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {item.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0">
          <Button 
            className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-semibold transition-colors duration-300 group"
          >
            <span>Order Now</span>
            <Plus className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
