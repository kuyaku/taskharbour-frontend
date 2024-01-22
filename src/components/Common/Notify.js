import { useEffect } from "react";
import { XCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { closeNotify } from "../../utils/userDataSlice";
import { hideModal } from "../../utils/appControlsSlice";

const Notify = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(closeNotify());
    }, 3000);
    if (props.status) {
      dispatch(hideModal());
    }
  }, []);

  let _class =
    "min-w-[200px] flex items-end absolute top-2 left-1/2 z-50 p-2 px-4 gap-2 text-white flex-col rounded-md ";

  if (props.status) {
    _class += "bg-green-600";
  } else {
    _class += "bg-red-600";
  }

  return (
    <div className={_class}>
      <div className="w-full flex justify-center">
        <p className="">{props.message}</p>
      </div>
    </div>
  );
};

export default Notify;
