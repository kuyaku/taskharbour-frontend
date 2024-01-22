import NavItem from "./NavItem";
import team from "../../assets/icons/team.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import project from "../../assets/icons/project.svg";
import NewProject from "./Buttons/NewProject";
import NewTeam from "./Buttons/NewTeam";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ToggleMode from "./ToggleMode";

const Sidenav2 = ({ device_size }) => {
  const current_page = useSelector((store) => store.appControl.current_page);
  return (
    <div
      className={
        "lg:h-full w-full lg:w-[60px] dark:text-white lg:border-r dark:border-r-gray-800 flex lg:flex-col gap-1 p-2 bg-gray-100 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 lg:border-b-0"
      }
    >
      <div className="flex lg:flex-col gap-1 flex-1">
        <Link to={"/dashboard"}>
          <NavItem
            itemName=""
            icon={dashboard}
            current_page={current_page === "dashboard" ? true : false}
            device_size={device_size}
          />
        </Link>
        <Link to={"/teams"}>
          <NavItem
            itemName=""
            icon={team}
            current_page={current_page === "teams" ? true : false}
            device_size={device_size}
          />
        </Link>
        <Link to={"/projects"}>
          <NavItem
            itemName=""
            icon={project}
            current_page={current_page === "projects" ? true : false}
            device_size={device_size}
          />
        </Link>
      </div>
      <div className="">
        {(device_size === "sm" || device_size === "md") && <ToggleMode />}
      </div>
    </div>
  );
};

export default Sidenav2;
