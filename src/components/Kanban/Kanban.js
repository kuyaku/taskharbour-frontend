import { useSearchParams } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Modal from "../Common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { get_project } from "../../utils/userDataSlice";
import AddBoardForm from "../Common/Forms/AddBoardForm";
import Notify from "../Common/Notify";
import MainSectionKanban from "./MainSectionKanban";
import AddCardForm from "../Common/Forms/AddCardForm";

const Kanban = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const user = useSelector((store) => store.auth.user);
  const modalData = useSelector((store) => store.appControl.modal);
  const notify = useSelector((store) => store.userData.notify);

  useEffect(() => {
    dispatch(get_project(searchParams.get("p")));
  }, []);

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div className="min-h-screen relative">
      <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col max-w-full">
        <Header />
        <MainSectionKanban project_id={searchParams.get("p")} />
      </div>
      <div>
        <Footer />
      </div>
      {modalData.showModal && (
        <Modal>
          {modalData.children === "new_board" && (
            <AddBoardForm data={modalData.data} />
          )}
          {modalData.children === "new_card" && (
            <AddCardForm data={modalData.data} />
          )}
        </Modal>
      )}

      {notify.showNotification && (
        <Notify status={notify.status} message={notify.message} />
      )}
    </div>
  );
};

export default Kanban;
