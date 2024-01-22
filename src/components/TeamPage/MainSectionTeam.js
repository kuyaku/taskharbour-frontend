import Sidenav from "../Common/Sidenav";
import Sidenav2 from "../Common/Sidenav2";
import { useSelector } from "react-redux";

const MainSectionTeam = (props) => {
  const showSideNav = useSelector((store) => store.appControl.showSideNav);
  const device_size = useSelector((store) => store.appControl.device_size);

  return (
    <div className="h-screen flex flex-col">
      <div className="min-h-[70px] max-h-[70px]"></div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {showSideNav ? (
          <Sidenav device_size={device_size} />
        ) : (
          <Sidenav2 device_size={device_size} />
        )}
        <div className="gap-10 flex flex-col overflow-hidden flex-1 items-center justify-center p-6">
          <p className="dark:text-gray-100 text-xl">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default MainSectionTeam;
