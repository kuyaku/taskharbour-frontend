import { useSelector } from "react-redux";
import ProjectListing from "./ProjectListing";
import NewProject from "./Buttons/NewProject";

const ProjectList = () => {
  const my_projects = useSelector((store) => store.userData.my_projects);
  // my_projects = null;
  if (!my_projects) {
    console.log("projects are not loaded yet!");
  }

  return (
    <div className="p-2 lg:p-6 lg:pt-2 pt-2 lg:pl-10 h-1/2 text-sm lg:text-lg  relative flex flex-col">
      <div className="lg:mb-2 flex flex-col lg:flex-row absolute h-[40px] w-full">
        <h1 className="dark:text-gray-400 font-bold">Projects</h1>
      </div>
      {!my_projects ? (
        <div className="mt-[50px] flex flex-col gap-1 lg:gap-2">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      ) : my_projects.length === 0 ? (
        <div className="p-6 mt-[40px] pl-10 h-3/4 border-dashed border border-gray-300 flex justify-center items-center bg-gray-100 dark:bg-gray-800">
          <NewProject
            class={"dark:text-gray-200 border dark:border-gray-400 p-2"}
            name={"Create your first project now."}
          />
        </div>
      ) : (
        <div className="flex max-h-full pt-[40px] flex-1">
          <div className="rounded-md w-full h-full overflow-y-auto flex flex-col gap-1 lg:gap-2">
            <div className="flex text-gray-600">
              <div className="w-1/3">
                <p>Name</p>
              </div>
              <div className="flex-1 flex justify-around">
                {/* <p>Creator</p> */}
                <p>Team</p>
              </div>
              <div className="w-1/5"></div>
            </div>
            {my_projects &&
              my_projects.map((item) => (
                <ProjectListing key={item.id} data={item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
