import "./App.css";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/Homepage/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import appControlsSlice, { changeDeviceSize } from "./utils/appControlsSlice";
import Kanban from "./components/Kanban/Kanban";
import TeamPage from "./components/TeamPage/TeamPage";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import { useEffect } from "react";

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
  {
    path: "/teams",
    element: <TeamPage />,
  },
  {
    path: "/projects",
    element: <ProjectPage />,
  },
]);

function App() {
  console.log("rendering app");
  const dispatch = useDispatch();
  const handleResize = () => {
    dispatch(changeDeviceSize(window.innerWidth));
  };
  useEffect(() => {
    dispatch(changeDeviceSize(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const mode = useSelector((store) => store.appControl.mode);
  document.documentElement.classList.toggle("dark", mode);
  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
      {/* <Auth /> */}
    </div>
  );
}

export default App;
