import React from "react";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <main className="w-full flex">
      <Outlet />
    </main>
  );
}
