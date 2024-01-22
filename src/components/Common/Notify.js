import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeNotify } from "../../utils/userDataSlice";
import { hideModal } from "../../utils/appControlsSlice";

const Notify = ({ message, status }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(closeNotify());
    }, 3000);
    if (status) {
      dispatch(hideModal());
    }
  }, []);

  return (
    <div
      className={
        "w-full flex flex-col items-center absolute top-2 z-50 p-2 px-4 gap-2 text-white"
      }
    >
      <div
        style={{ backgroundColor: status ? "#4CBB17" : "red" }}
        className="max-w-[350px] min-w-[200px] flex justify-center rounded-md"
      >
        <p className="p-2 px-3 text-center">{message}</p>
      </div>
    </div>
  );
};

export default Notify;
