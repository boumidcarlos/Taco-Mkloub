import { motion } from "framer-motion";
import { Loader2, QrCode } from "lucide-react";
import { useMenuItems } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";
import { Header } from "@/components/Header";
import { AddMenuItem } from "@/components/AddMenuItem";
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

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Menu Section */}
        <section className="container mx-auto px-4 md:px-6 py-16 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">Our Special Menu</h2>
              <p className="text-muted-foreground mt-2">Prepared fresh daily just for you</p>
            </div>
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <QrCode className="w-4 h-4" />
                    Menu QR Code
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
                    <p className="text-sm text-muted-foreground text-center">
                      Customers can scan this code to view the menu on their phones.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <AddMenuItem />
            </div>
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
          <p className="font-display text-lg font-medium text-foreground mb-4">el ostath</p>
          <p>© 2024 el ostath Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
