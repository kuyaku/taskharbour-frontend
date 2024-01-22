import { useDispatch } from "react-redux";
import { showModal } from "../../../utils/appControlsSlice";

const NewTeam = (props) => {
  const dispatch = useDispatch();

  const handleJoinRequestClick = (data) => {
    dispatch(showModal({ children: "new_team", data: data }));
  };
  return (
    <button
      className={props.class}
      onClick={() => handleJoinRequestClick(props.data)}
    >
      {props.name}
    </button>
  );
};

export default NewTeam;
