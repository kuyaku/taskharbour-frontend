import { XCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { hideModal } from "../../utils/appControlsSlice";

const Modal = (props) => {
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(hideModal());
  };
  return (
    <div className="p-2 absolute top-0 left-0 h-screen  bg-black bg-opacity-60 dark:bg-opacity-70 w-full dark:text-white flex justify-center items-center flex-col z-50">
      <div className="w-full lg:w-[550px] flex justify-end p-2 text-gray-300">
        <button onClick={handleModalClose}>
          <XCircle />
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-950 lg:w-[550px] w-full border-gray-200 lg:p-4 rounded-md border dark:border-gray-700">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
