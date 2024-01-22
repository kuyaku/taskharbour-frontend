import Sidenav from "../Common/Sidenav";
import Sidenav2 from "../Common/Sidenav2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KanbanTop from "./KanbanTop";
import KanbanBottom from "./KanbanBottom";
import { check_if_admin } from "../../utils/utilities";

const MainSectionKanban = ({ project_id }) => {
  const showSideNav = useSelector((store) => store.appControl.showSideNav);
  const project = useSelector((store) => store.userData.kanban_project);
  const user = useSelector((store) => store.auth.user);
  const device_size = useSelector((store) => store.appControl.device_size);

  let is_admin = false;

  if (project) {
    is_admin = check_if_admin(user, project.creator, project.team);
  }

  // console.log("From main section kanban: ", is_admin, project);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(get_my_projects());
  // }, []);
  return (
    <div className="h-screen flex flex-col">
      <div className="min-h-[70px] max-h-[70px]"></div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {showSideNav ? (
          <Sidenav device_size={device_size} />
        ) : (
          <Sidenav2 device_size={device_size} />
        )}
        <div className="gap-2 lg:gap-10 flex flex-col overflow-hidden flex-1">
          <div className="flex flex-col flex-1 overflow-hidden">
            <KanbanTop project={project} is_admin={is_admin} />
            <KanbanBottom
              project={project}
              is_admin={is_admin}
              team={project ? project.team : {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSectionKanban;
