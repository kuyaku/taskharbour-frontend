import { useDispatch } from "react-redux";
import { showModal } from "../../../utils/appControlsSlice";

const NewBoard = ({ data }) => {
  // console.log("new board clicked");
  const dispatch = useDispatch();
  const handleAddBoardClick = (data) => {
    dispatch(showModal({ children: "new_board", data: data }));
  };
  return (
    <button
      onClick={() => handleAddBoardClick(data)}
      className="text-sm lg:text-lg bg-green-600 px-2 py-1 rounded-md text-gray-100"
    >
      + Add Board
    </button>
  );
};

export default NewBoard;
