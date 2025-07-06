import AppGrid from "./components/layout/AppGrid";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppGrid />,
      children: [
        { path: "/", element: <div>Dashboard Page</div> },
        { path: "/expenses", element: <div>Expenses Page</div> },
        { path: "/chores", element: <div>Chores Page</div> },
        { path: "/shopping", element: <div>Shopping Page</div> },
        { path: "/polls", element: <div>Polls Page</div> },
        { path: "/settings", element: <div>Settings Page</div> },
        { path: "/logout", element: <div>Logout Page</div> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
