import TimeAgo from "../Common/TimeAgo";
import UserAvatar from "../Common/UserAvatar";
import Chip from "./Chip";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { move_card } from "../../utils/userDataSlice";

const Card = ({ data, project_id }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { id, title, color, people, chips, created_at, position, board } = data;
  console.log("card: ", title, position, id);
  const [, drag] = useDrag({
    type: "CARD",
    item: {
      id: id,
      originalIndex: position,
      board: board,
      new_board: null,
      newPosition: null,
    },
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item, monitor) => {
      const draggedId = item.id;
      const hoverIndex = position;
      const target_board_id = board;
      item.new_board = target_board_id;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY < hoverMiddleY) {
        // above 50%, the card's position should be the position of current card
        item.newPosition = hoverIndex;
      }
      if (hoverClientY > hoverMiddleY) {
        // below 50%, the cards' position should be below the current card
        item.newPosition = hoverIndex + 1;
      }

      if (item.originalIndex === hoverIndex && item.board === target_board_id) {
        item.newPosition = null;
        console.log("over itself");
      }
    },
    drop: (item, monitor) => {
      // console.log(item);
      if (!item.newPosition) return;
      const data = {
        card_id: item.id,
        target_board_id: item.new_board,
        position: item.newPosition,
      };
      if (
        item.board === item.new_board &&
        item.newPosition === item.originalIndex
      ) {
        return;
      }
      console.log(
        "coming from ",
        item.originalIndex,
        " going to ",
        item.newPosition
      );

      dispatch(move_card({ project_id: project_id, board_id: board, data }));
    },
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ borderLeft: `3px solid ${color}` }}
      className={`bg-gray-100 dark:bg-gray-900 rounded-md p-2 flex flex-col gap-2`}
    >
      <div className="flex flex-wrap gap-1">
        {chips.map((item) => (
          <Chip key={item.id} name={item.name} color={item.color} />
        ))}
      </div>
      <div>
        <h1 className="font-bold">{title}</h1>
      </div>
      <div className="flex justify-end">
        {people &&
          people.map((item) => (
            <div key={item.id} className="-ml-2 hover:z-50">
              <UserAvatar user={item} />
            </div>
          ))}
      </div>
      <div className="text-gray-400 text-sm">
        Created on: <TimeAgo timestamp={created_at} />
      </div>
    </div>
  );
};
export default Card;
