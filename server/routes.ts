import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.menu.list.path, async (req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  app.post(api.menu.create.path, async (req, res) => {
    try {
      const input = api.menu.create.input.parse(req.body);
      const item = await storage.createMenuItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  // Seed data
  const existing = await storage.getMenuItems();
  if (existing.length === 0) {
    const items = [
      { name: "Chicha Luxe", price: 15, category: "chicha", description: "Chicha avec goût au choix", imageUrl: null },
      { name: "Chicha Simple", price: 10, category: "chicha", description: "Chicha classique", imageUrl: null },
      { name: "Tacos", price: 20, category: "salés", description: "Authentic French tacos", imageUrl: null },
      { name: "Mkloub", price: 10, category: "salés", description: "Traditional Tunisian sandwich", imageUrl: null },
      { name: "Jus d'Orange", price: 8, category: "jus", description: "Frais et naturel", imageUrl: null },
      { name: "Jus de Fraise", price: 9, category: "jus", description: "Saisonier et rafraîchissant", imageUrl: null },
      { name: "Espresso", price: 4, category: "caffé", description: "Café intense", imageUrl: null },
      { name: "Direct", price: 5, category: "caffé", description: "Café au lait", imageUrl: null },
    ];
    for (const item of items) {
      await storage.createMenuItem(item);
    }
  }

  return httpServer;
}
