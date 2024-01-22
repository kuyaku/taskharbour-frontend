import { useDispatch, useSelector } from "react-redux";
import Board from "./Board";
import { get_project_boards } from "../../utils/userDataSlice";
import { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const KanbanBottom = ({ project, is_admin, team }) => {
  const dispatch = useDispatch();
  const boards = useSelector((store) => store.userData.project_boards);
  const force_reload = useSelector(
    (store) => store.userData.force_reload.kanban_bottom
  );
  // console.log("from kanban bottom: ", team);

  useEffect(() => {
    project && dispatch(get_project_boards(project.id));
  }, [project, force_reload]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex pb-4 overflow-x-auto gap-2 lg:gap-4 px-2 lg:px-5 overflow-hidden flex-1">
        {boards?.count === 0 && (
          <>
            <Board shimmer={true} data={{}} is_admin={is_admin} team={{}} />
            <Board shimmer={true} data={{}} is_admin={is_admin} team={{}} />
            {/* <Board shimmer={true} data={{}} is_admin={is_admin} team={{}} /> */}
          </>
        )}
        {boards?.results.map((item) => (
          <Board key={item.id} data={item} is_admin={is_admin} team={team} />
        ))}
      </div>
    </DndProvider>
  );
};
export default KanbanBottom;
