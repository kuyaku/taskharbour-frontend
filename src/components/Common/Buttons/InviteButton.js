import { useDispatch } from "react-redux";
import { showModal } from "../../../utils/appControlsSlice";

const InviteButton = ({ data }) => {
  const dispatch = useDispatch();

  const handleInviteButtonClick = (data) => {
    dispatch(showModal({ children: "invite_request", data: data }));
  };

  return (
    <div>
      <button
        className="p-0.5 px-2 text-gray-100 rounded-md bg-blue-600"
        onClick={(e) => {
          e.stopPropagation();
          handleInviteButtonClick(data);
        }}
      >
        Invite
      </button>
    </div>
  );
};

export default InviteButton;
