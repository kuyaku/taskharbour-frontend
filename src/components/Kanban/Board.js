import { useDrop } from "react-dnd";
import NewCard from "../Common/Buttons/NewCard";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { move_card } from "../../utils/userDataSlice";

const Board = ({ data, is_admin, shimmer, team }) => {
  const dispatch = useDispatch();
  const { id, cards, title, color, project } = data;
  // console.log(cards);

  const handleDropCard = (cardId) => {
    if (cards && cards.length > 0) return;
    if (cardId) {
      const data = {
        card_id: cardId,
        target_board_id: id,
      };
      dispatch(move_card({ project_id: project, board_id: id, data }));
    }
  };

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => handleDropCard(item.id),
  });
  // console.log("from board: ", team);

  if (shimmer) {
    return (
      <div className="lg:w-[350px] max-w-[400px] min-w-[250px] lg:min-w-[350px] border bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md dark:text-gray-200 flex flex-col h-full"></div>
    );
  }
  return (
    <div className="border w-[350px] max-w-[400px] lg:min-h-[500px] min-w-[300px] lg:min-w-[350px] bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md dark:text-gray-200 flex flex-col h-full">
      <div className="">
        <h1 className="p-2">
          {title}{" "}
          <span className="text-gray-400 font-bold text-xl ml-4">
            {cards && cards.length}
          </span>
        </h1>
        <hr style={{ border: `3px solid ${color}` }} />
      </div>
      <div
        ref={drop}
        className="overflow-y-auto p-1 flex-1 flex flex-col gap-2"
      >
        {cards &&
          cards.map((item) => (
            <Card key={item.id} data={item} project_id={project} />
          ))}

        {is_admin && (
          <div className="">
            <NewCard data={data} team={team} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
