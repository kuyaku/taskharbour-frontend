import { useDispatch } from "react-redux";
import { showModal } from "../../../utils/appControlsSlice";

const NewProject = (props) => {
  const dispatch = useDispatch();

  const handleJoinRequestClick = (data) => {
    dispatch(showModal({ children: "new_project", data: data }));
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

export default NewProject;
