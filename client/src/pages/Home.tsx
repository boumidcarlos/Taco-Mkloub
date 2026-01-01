import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMenuItems } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";
import { Header } from "@/components/Header";
import { AddMenuItem } from "@/components/AddMenuItem";

export default function Home() {
  const { data: items, isLoading, error } = useMenuItems();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Unsplash image: Dark restaurant food background */}
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant Ambience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            >
              Taste the Authentic <br/>
              <span className="text-primary">Tunisian Flavors</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto mb-8"
            >
              Experience our handcrafted menu featuring traditional spices and modern twists. 
              Fresh ingredients, unforgettable taste.
            </motion.p>
          </div>
        </section>

        {/* Menu Section */}
        <section className="container mx-auto px-4 md:px-6 py-16 -mt-10 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">Our Special Menu</h2>
              <p className="text-muted-foreground mt-2">Prepared fresh daily just for you</p>
            </div>
            <AddMenuItem />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-destructive">
              <p>Failed to load menu items. Please try again later.</p>
            </div>
          ) : items?.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border/50 shadow-sm">
              <h3 className="text-xl font-medium text-foreground">No items yet</h3>
              <p className="text-muted-foreground mt-2">Be the first to add something delicious!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {items?.map((item, index) => (
                <MenuCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-secondary/50 border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
          <p className="font-display text-lg font-medium text-foreground mb-4">Tunisian Bites</p>
          <p>© 2024 Tunisian Bites Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
