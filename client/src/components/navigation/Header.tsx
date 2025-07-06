import React from "react";
import { useLocation } from "react-router";
import { BellRing, CircleUserRound } from "lucide-react";
export default function Header() {
  const location = useLocation();
  return (
    <header className="bg-transparent flex justify-between items-center h-full px-8">
      <div>
        <h1 className="text-2xl font-bold text-blue-950">
          {location.pathname === "/"
            ? "Dashboard"
            : location.pathname.slice(1, 2).toUpperCase() +
              location.pathname.slice(2)}
        </h1>
      </div>
      <div className="w-20">
        <div className="flex justify-between">
          <BellRing className="w-7 h-7" />
          <CircleUserRound className="w-7 h-7" />
        </div>
      </div>
    </header>
  );
}
