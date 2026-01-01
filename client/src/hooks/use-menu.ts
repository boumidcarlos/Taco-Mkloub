import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertMenuItem } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useMenuItems() {
  return useQuery({
    queryKey: [api.menu.list.path],
    queryFn: async () => {
      const res = await fetch(api.menu.list.path);
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMenuItem) => {
      const res = await fetch(api.menu.create.path, {
        method: api.menu.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Failed to create menu item");
      }
      
      return api.menu.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.menu.list.path] });
      toast({
        title: "Success",
        description: "Menu item added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
