import { useDispatch, useSelector } from "react-redux";
import KanbanNav from "./KanbanNav";
import { Settings } from "react-feather";
import { showModal } from "../../utils/appControlsSlice";
import AddBoardForm from "../Common/Forms/AddBoardForm";
import NewBoard from "../Common/Buttons/NewBoard";
import { check_if_admin } from "../../utils/utilities";

const KanbanTop = ({ project, is_admin }) => {
  // project = null;
  // const dispatch = useDispatch();
  if (!project) {
    return (
      <div className="h-[120px] p-6 flex flex-col gap-3">
        <div className="flex">
          <div className="flex-1">
            <div className="h-8 lg:h-10 w-[200px] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-8 lg:w-[120px] w-0 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-8 lg:w-[120px] w-[100px] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-6 lg:h-8 w-[120px] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-6 lg:h-8 w-[120px] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  }
  const { title, team, creator } = project;

  return (
    <div className="px-2 lg:px-8 py-4 flex flex-col gap-3">
      {/* <KanbanNav /> */}
      <div className="dark:text-gray-200 flex">
        <div className="flex-1 flex flex-col items-start lg:gap-2">
          <div className="flex flex-col">
            {is_admin && (
              <p className="text-xs lg:text-sm text-gray-100 bg-green-600 px-1 rounded-md w-fit">
                Admin
              </p>
            )}
            <h1 className="font-bold text-lg lg:text-3xl">
              {title}
              <span className="mx-1 lg:mx-3 text-xs lg:text-sm text-gray-500">
                by {creator?.username}
              </span>
            </h1>
          </div>
          {team.name ? (
            <button className="text-gray-400">See members</button>
          ) : (
            <div className="flex gap-2 lg:gap-5 text-sm">
              <p className="text-gray-400">Personal project</p>
              <button className="text-gray-200 border border-gray-500 bg-gray-900 px-1">
                Add team
              </button>
            </div>
          )}
          <button></button>
        </div>
        {is_admin && (
          <div className="flex gap-2 lg:gap-3 items-center">
            <NewBoard data={project} />
            <Settings className="w-5 h-5" />
          </div>
        )}
      </div>
      {/* <hr className="dark:border-gray-800" /> */}
    </div>
  );
};

export default KanbanTop;
