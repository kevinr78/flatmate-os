import {
  House,
  Wallet,
  BrushCleaning,
  ShoppingBasket,
  SquareMenu,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";
type SidebarLink = {
  name: string;
  path: string;
  icon: LucideIcon;
};

const basePath = "/home";
export const sidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    path: `${basePath}/dashboard`,
    icon: House,
  },

  {
    name: "Expenses",
    path: `${basePath}/expenses`,
    icon: Wallet,
  },
  {
    name: "Chores",
    path: `${basePath}/chores`,
    icon: BrushCleaning,
  },
  {
    name: "Shopping List",
    path: `${basePath}/shopping`,
    icon: ShoppingBasket,
  },
  {
    name: "Polls",
    path: `${basePath}/polls`,
    icon: SquareMenu,
  },
];
