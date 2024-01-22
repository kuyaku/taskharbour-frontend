import Sidenav from "../Common/Sidenav";
import Sidenav2 from "../Common/Sidenav2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_my_teams, get_my_projects } from "../../utils/userDataSlice";
import UserGreet from "../Common/UserGreet";
import TeamList from "../Common/TeamList";
import ProjectList from "../Common/ProjectList";

const MainSection = (props) => {
  const reload = useSelector((store) => store.userData.force_reload.dashboard);
  const showSideNav = useSelector((store) => store.appControl.showSideNav);
  const device_size = useSelector((store) => store.appControl.device_size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_my_teams());
    dispatch(get_my_projects());
  }, [reload]);
  return (
    <div className="h-screen flex flex-col">
      <div className="min-h-[70px] max-h-[70px]"></div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {showSideNav ? (
          <Sidenav device_size={device_size} />
        ) : (
          <Sidenav2 device_size={device_size} />
        )}
        <div className="gap-2 lg:gap-2 flex flex-col overflow-hidden flex-1 pb-6 lg:pb-2 overflow-y-auto">
          <>
            <UserGreet />
            <TeamList />
            <ProjectList />
          </>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
