import { db } from "./db";
import { menuItems, type MenuItem, type InsertMenuItem } from "@shared/schema";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
