import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../../utils/authSlice";
import { Navigate } from "react-router-dom";
import client from "../../api/client";
import Header from "../Common/Header";
import MainSection from "./MainSection";
import Footer from "../Common/Footer";

const Dashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAsync());
  };

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  const users = client.get("user").then((data) => console.log(data));
  const my_team = client.get("my_team").then((data) => console.log(data));

  return (
    <div className="min-h-screen">
      <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Header />
        <MainSection />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
