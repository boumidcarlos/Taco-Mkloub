import { UtensilsCrossed } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
            Tunisian Bites
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Menu</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-sm">
            Book Table
          </button>
        </nav>
      </div>
    </header>
  );
}
