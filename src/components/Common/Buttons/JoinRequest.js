import { useDispatch } from "react-redux";
import { showModal } from "../../../utils/appControlsSlice";

const JoinRequest = (props) => {
  const dispatch = useDispatch();

  const handleJoinRequestClick = (data) => {
    dispatch(showModal({ children: "join_requests", data: data }));
  };
  return (
    <button
      className="p-0.5 px-2 border rounded-sm dark:text-gray-300 dark:border-gray-400"
      onClick={(e) => {
        e.stopPropagation();
        handleJoinRequestClick(props.data);
      }}
    >
      Join requests
    </button>
  );
};

export default JoinRequest;
