import "./App.css";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/Homepage/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import appControlsSlice from "./utils/appControlsSlice";
import Kanban from "./components/Kanban/Kanban";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/kanban",
    element: <Kanban />,
  },
]);

function App() {
  console.log("rendering");
  const mode = useSelector((store) => store.appControl.mode);
  document.documentElement.classList.toggle("dark", mode);
  console.log("dark", mode);
  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
      {/* <Auth /> */}
    </div>
  );
}

export default App;
