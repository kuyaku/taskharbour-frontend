import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useEffect } from "react";
import { change_current_page } from "../../utils/appControlsSlice";
import MainSectionTeam from "./MainSectionTeam";

const TeamPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    dispatch(change_current_page("teams"));
  }, []);

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className="min-h-screen relative">
      <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Header />
        <MainSectionTeam />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default TeamPage;
