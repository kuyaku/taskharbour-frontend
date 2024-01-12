import NavItem from "./NavItem";
import team from "../../assets/icons/team.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import project from "../../assets/icons/project.svg";

const Sidenav = () => {
  return (
    <div className="w-[250px] h-full dark:text-white border-r dark:border-r-gray-800 flex flex-col gap-1 p-2">
      <div className="p-4 flex flex-col gap-1">
        <NavItem itemName="Dashboard" icon={dashboard} />
        <NavItem itemName="Teams" icon={team} />
        <NavItem itemName="Projects" icon={project} />
      </div>
      <hr className="dark:border-gray-800" />
      <div className="flex flex-col gap-2 p-4">
        <button className="border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900">
          New Team
        </button>
        <button className="border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900">
          New Project
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
