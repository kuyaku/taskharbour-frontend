import { Outlet } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

const Section = () => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname === "/auth/" || pathname === "auth" || pathname === "/auth") {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div className="flex-1 flex justify-center items-center px-3">
      <Outlet />
    </div>
  );
};

export default Section;
