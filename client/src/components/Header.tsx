import { UtensilsCrossed } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            el ostadh
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Menu</a>
        </nav>
      </div>
    </header>
  );
}
