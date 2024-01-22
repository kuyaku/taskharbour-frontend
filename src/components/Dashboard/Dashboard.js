import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../Common/Header";
import MainSection from "./MainSection";
import Footer from "../Common/Footer";
import Modal from "../Common/Modal";
import JoinRequest from "../Common/JoinRequest";
import NewTeamForm from "../Common/Forms/NewTeamForm";
import NewProjectForm from "../Common/Forms/NewProjectForm";
import Notify from "../Common/Notify";
import InviteForm from "../Common/Forms/InviteForm";
import Team from "./Team";
import Project from "./Project";
import AddBoardForm from "../Common/Forms/AddBoardForm";
import { useEffect, useState } from "react";
import { change_current_page } from "../../utils/appControlsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const modalData = useSelector((store) => store.appControl.modal);
  const notify = useSelector((store) => store.userData.notify);

  useEffect(() => {
    dispatch(change_current_page("dashboard"));
  }, []);

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className="min-h-screen relative">
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <MainSection />
      </div>
      <div>
        <Footer />
      </div>
      {modalData.showModal && (
        <Modal>
          {modalData.children === "join_requests" && (
            <JoinRequest data={modalData.data} />
          )}
          {modalData.children === "new_team" && <NewTeamForm />}
          {modalData.children === "new_project" && <NewProjectForm />}
          {modalData.children === "invite_request" && (
            <InviteForm data={modalData.data} />
          )}
          {modalData.children === "team_info" && <Team data={modalData.data} />}
          {modalData.children === "project_info" && (
            <Project data={modalData.data} />
          )}
        </Modal>
      )}
      {notify.showNotification && (
        <Notify status={notify.status} message={notify.message} />
      )}
    </div>
  );
};

export default Dashboard;
