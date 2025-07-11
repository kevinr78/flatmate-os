import { NavLink } from "react-router";
import { sidebarLinks } from "./sidebarLinks";
export default function AppSidebar() {
  return (
    <aside className="h-full flex flex-col bg-blue-950 rounded-2xl">
      <div className=" text-white">
        <div className="flex items-center justify-center h-16 ">
          <h1 className="text-xl font-bold">App Sidebar</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => {
                    return `block p-2 hover:bg-gray-700 rounded ${
                      isActive ? "bg-gray-700" : ""
                    }`;
                  }}
                >
                  <span className="flex items-center gap-2">
                    <link.icon />
                    <span className="hidden md:block">{link.name}</span>
                  </span>
                </NavLink>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
