import React from "react";
import { useLocation } from "react-router";
import { BellRing, CircleUserRound } from "lucide-react";
export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="bg-transparent flex justify-between items-center h-full px-8">
      <div className="breadcrumbs text-sm">
        <ul>
          {pathname.split("/").map((segment, index) => {
            if (segment === "") return null; // Skip empty segments
            return (
              <li key={index}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </li>
            );
          })}
        </ul>
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
