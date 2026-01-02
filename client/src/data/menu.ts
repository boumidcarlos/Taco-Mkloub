export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string | null;
  imageUrl: string | null;
}

export const menuItems: MenuItem[] = [
  { id: 1, name: "Chicha Luxe", price: 15, category: "chicha", description: "Chicha avec goût au choix", imageUrl: null },
  { id: 2, name: "Chicha Simple", price: 10, category: "chicha", description: "Chicha classique", imageUrl: null },
  { id: 3, name: "Tacos", price: 20, category: "sandwitch", description: "Authentic French tacos", imageUrl: null },
  { id: 4, name: "Mkloub", price: 10, category: "sandwitch", description: "Traditional Tunisian sandwich", imageUrl: null },
  { id: 5, name: "Jus d'Orange", price: 8, category: "boissons", description: "Frais et naturel", imageUrl: null },
  { id: 6, name: "Jus de Fraise", price: 9, category: "boissons", description: "Saisonier et rafraîchissant", imageUrl: null },
  { id: 7, name: "Espresso", price: 4, category: "boissons", description: "Café intense", imageUrl: null },
  { id: 8, name: "Direct", price: 5, category: "boissons", description: "Café au lait", imageUrl: null },
  { id: 9, name: "Pizza Margherita", price: 18, category: "pizza", description: "Tomate, mozzarella, basilic", imageUrl: null },
  { id: 10, name: "Pizza Reine", price: 22, category: "pizza", description: "Jambon, champignons, fromage", imageUrl: null },
];
