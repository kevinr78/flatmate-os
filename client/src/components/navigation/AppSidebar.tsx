import {
  House,
  Wallet,
  BrushCleaning,
  ShoppingBasket,
  SquareMenu,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router";
export default function AppSidebar() {
  return (
    <aside className="h-full flex flex-col bg-blue-950 rounded-2xl">
      <div className=" text-white">
        <div className="flex items-center justify-center h-16 ">
          <h1 className="text-xl font-bold">App Sidebar</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <NavLink
              to={"/"}
              className={({ isActive }) => {
                return `block p-2 hover:bg-gray-700 rounded ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <span className="flex items-center gap-2">
                <House />
                <span className="hidden md:block">Home</span>
              </span>
            </NavLink>
            <NavLink
              to={"/expenses"}
              className={({ isActive }) => {
                return `block p-2 hover:bg-gray-700 rounded ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <span className="flex items-center gap-2">
                <Wallet />
                <span className="hidden md:block">Expenses</span>
              </span>
            </NavLink>
            <NavLink
              to={"/chores"}
              className={({ isActive }) => {
                return `block p-2 hover:bg-gray-700 rounded ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <span className="flex items-center gap-2">
                <BrushCleaning />
                <span className="hidden md:block">Chores</span>
              </span>
            </NavLink>
            <NavLink
              to={"/shopping"}
              className={({ isActive }) => {
                return `block p-2 hover:bg-gray-700 rounded ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <span className="flex items-center gap-2">
                <ShoppingBasket />
                <span className="hidden md:block">Shopping List</span>
              </span>
            </NavLink>
            <NavLink
              to={"/polls"}
              className={({ isActive }) => {
                return `block p-2 hover:bg-gray-700 rounded ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <span className="flex items-center gap-2">
                <SquareMenu />
                <span className="hidden md:block">Polls</span>
              </span>
            </NavLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
