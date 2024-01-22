import { ChevronsRight } from "react-feather";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showModal } from "../../utils/appControlsSlice";

const ProjectListing = ({ data }) => {
  const dispatch = useDispatch();
  const { id, title, creator, team } = data;
  const shortTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;
  const shortTeam =
    team.name && team.name.length > 15
      ? team.name.slice(0, 15) + "..."
      : team.name;
  const handleProjectClick = (data) => {
    dispatch(showModal({ children: "project_info", data: data }));
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleProjectClick(data);
      }}
      className="bg-gray-100 dark:text-gray-200 dark:bg-gray-800 p-2 px-4 rounded-sm flex gap-2"
    >
      <div className="w-1/3">
        <p title={title}>{shortTitle}</p>
      </div>
      <div className="flex flex-1 justify-around">
        {/* <p>{creator.username}</p> */}
        <p>{team.name ? shortTeam : "Personal"}</p>
      </div>
      <div className="flex gap-2 w-1/5 justify-end">
        <Link to={`/kanban?p=${id}`}>
          <ChevronsRight onClick={(e) => e.stopPropagation()} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectListing;
