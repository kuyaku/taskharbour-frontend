import { useDispatch } from "react-redux";
import { showModal } from "../../../utils/appControlsSlice";

const NewCard = ({ data, team }) => {
  //   console.log("from new card: ", team);

  const dispatch = useDispatch();
  const handleAddCardClick = (data) => {
    dispatch(showModal({ children: "new_card", data: { data, team } }));
  };
  return (
    <button
      onClick={() => handleAddCardClick(data)}
      className="w-full text-gray-100 bg-blue-600 shadow-md py-2 rounded-lg"
    >
      + Add Card
    </button>
  );
};

export default NewCard;
