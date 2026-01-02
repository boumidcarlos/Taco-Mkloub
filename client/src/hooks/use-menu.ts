import { menuItems, type MenuItem } from "@/data/menu";

export function useMenuItems() {
  return {
    data: menuItems,
    isLoading: false,
    error: null,
  };
}

