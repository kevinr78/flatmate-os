import AppSidebar from "../navigation/AppSidebar";
import { Outlet } from "react-router";
import Header from "../navigation/Header";
export default function AppGrid() {
  return (
    <div className="grid grid-cols-5 grid-rows-8  h-screen">
      <div className="col-span-1 row-span-8">
        <AppSidebar />
      </div>
      <div className="col-span-4 col-start-2">
        <Header />
      </div>
      <div className="col-span-4 row-span-4 col-start-2 row-start-2">
        <Outlet />
      </div>
    </div>
  );
}
