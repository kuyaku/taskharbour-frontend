import NavItem from "./NavItem";
import team from "../../assets/icons/team.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import project from "../../assets/icons/project.svg";
import NewProject from "./Buttons/NewProject";
import NewTeam from "./Buttons/NewTeam";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../utils/authSlice";

const Sidenav = ({ device_size }) => {
  const current_page = useSelector((store) => store.appControl.current_page);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAsync());
  };
  return (
    <>
      <div className="min-w-[250px] lg:h-full  dark:text-white lg:border-r dark:border-r-gray-800 flex flex-col gap-1 p-2 border-b lg:border-b-0 pb-6 absolute lg:relative z-10 bg-gray-200 dark:bg-gray-950 w-full lg:w-fit">
        <div className="p-4 flex flex-col gap-1">
          <Link to={"/dashboard"}>
            <NavItem
              itemName="Dashboard"
              icon={dashboard}
              current_page={current_page === "dashboard" ? true : false}
              device_size={device_size}
            />
          </Link>
          <Link to={"/teams"}>
            <NavItem
              itemName="Teams"
              icon={team}
              current_page={current_page === "teams" ? true : false}
              device_size={device_size}
            />
          </Link>
          <Link to={"/projects"}>
            <NavItem
              itemName="Projects"
              icon={project}
              current_page={current_page === "projects" ? true : false}
              device_size={device_size}
            />
          </Link>
        </div>
        <hr className="dark:border-gray-800" />
        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-2 p-4 flex-1">
            <NewTeam
              class={
                "border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900"
              }
              name={"New Team"}
            />
            {/* <button className="border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900">
          New Project
        </button> */}
            <NewProject
              class={
                "border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900"
              }
              name={"New Project"}
            />
          </div>
          <div className="flex items-end justify-center">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      {/* <div className="min-w-[250px] lg:h-full  dark:text-white lg:border-r dark:border-r-gray-800 flex flex-col gap-1 p-2 border-b lg:border-b-0 pb-6 relative w-full lg:w-fit"></div> */}
    </>
  );
};

export default Sidenav;
