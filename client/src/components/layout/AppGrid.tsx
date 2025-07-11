import AppSidebar from "./AppSidebar.tsx";
import { Outlet } from "react-router";
import Header from "./Header.tsx";
import { ModalProvider } from "../../store/context/ModalContext.tsx";

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
        <ModalProvider>
          <div className="p-4">
            <Outlet />
          </div>
        </ModalProvider>
      </div>
    </div>
  );
}
