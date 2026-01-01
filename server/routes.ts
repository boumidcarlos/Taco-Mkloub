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
    await storage.createMenuItem({
      name: "Tacos",
      price: 20,
      category: "Main",
      description: "Authentic French tacos with cheese sauce and fries",
      imageUrl: "/assets/tacos.jpg"
    });
    await storage.createMenuItem({
      name: "Mkloub",
      price: 10,
      category: "Sandwich",
      description: "Traditional Tunisian folded pizza dough sandwich",
      imageUrl: "/assets/mkloub.jpg"
    });
  }

  return httpServer;
}
