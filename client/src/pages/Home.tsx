import { motion, AnimatePresence } from "framer-motion";
import { Loader2, QrCode, ChevronDown, ChevronUp } from "lucide-react";
import { useMenuItems } from "@/hooks/use-menu";
import { Header } from "@/components/Header";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: items, isLoading, error } = useMenuItems();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'url(/assets/menu-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 px-8 py-12">
          <div className="flex flex-col items-center mb-16 gap-6">
            <h2 className="text-4xl font-display font-bold uppercase tracking-widest text-primary">el ostedh</h2>
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
              <img src="/assets/logo.jpg" alt="el ostedh logo" className="w-full h-full object-cover" />
            </div>
          </div>

          <section className="relative z-20">
            <div className="flex justify-center mb-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex gap-2 text-muted-foreground opacity-50 hover:opacity-100">
                    <QrCode className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">Scan for Menu</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center p-6 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                      <QRCodeSVG 
                        value={window.location.href} 
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
              </div>
            ) : (
              <div className="space-y-4">
                {['Sandwitch', 'Boissons', 'Chicha', 'Pizza'].map((category) => {
                  const categoryItems = items?.filter(item => item.category.toLowerCase() === category.toLowerCase());
                  if (!categoryItems || categoryItems.length === 0) return null;
                  
                  const isExpanded = !!expandedCategories[category];

                  return (
                    <div key={category} className="border-b border-primary/10 last:border-0 pb-4">
                      <button 
                        onClick={() => toggleCategory(category)}
                        className="w-full flex justify-center items-center py-4 text-center group hover-elevate rounded-md px-2 -mx-2 transition-colors"
                      >
                        <h3 className="text-xl font-display font-bold uppercase tracking-widest text-primary">
                          {category}
                        </h3>
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-6 pt-4">
                              <div className="space-y-4">
                                {categoryItems.map((item) => (
                                  <div key={item.id} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                                      <div className="flex-1 mx-2 border-b border-dotted border-primary/20" />
                                      <div className="font-bold text-primary">
                                        {item.price} DT
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-tight italic">
                                      {item.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>

        <footer className="relative z-10 py-12 text-center text-muted-foreground bg-transparent">
          <p className="font-display text-sm tracking-widest uppercase text-primary mb-2">el ostadh</p>
          <p className="text-xs opacity-50">© 2024 el ostadh Restaurant</p>
        </footer>
      </div>
    </div>
  );
}
