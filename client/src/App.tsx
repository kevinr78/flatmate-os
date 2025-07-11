import AppGrid from "./components/layout/AppGrid";
import { createBrowserRouter, RouterProvider } from "react-router";
import HouseCard from "./components/ui/HouseCard";
import Home from "./components/layout/Home";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/login", element: <Login />, index: true },
        { path: "/signup", element: <Signup /> },
      ],
    },
    {
      path: "/home",
      element: <AppGrid />,
      children: [
        { path: "/home/dashboard", element: <HouseCard /> },
        { path: "/home/expenses", element: <div>Expenses Page</div> },
        { path: "/home/chores", element: <div>Chores Page</div> },
        { path: "/home/shopping", element: <div>Shopping Page</div> },
        { path: "/home/polls", element: <div>Polls Page</div> },
        { path: "/home/settings", element: <div>Settings Page</div> },
        { path: "/home/logout", element: <div>Logout Page</div> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
