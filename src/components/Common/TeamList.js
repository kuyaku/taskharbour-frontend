import { useSelector } from "react-redux";
import TeamListing from "./TeamListing";
import NewTeam from "./Buttons/NewTeam";
import { useState } from "react";
import JoinForm from "./Forms/JoinForm";

const TeamList = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleJoinButtonClick = () => {
    setShowJoinForm(true);
  };

  const my_teams = useSelector((store) => store.userData.my_teams);
  return (
    <div className="p-2 lg:p-6 pt-2 lg:pl-10 h-1/2 flex flex-col relative">
      <div className="lg:mb-2 flex flex-col lg:flex-row gap-1 lg:gap-6 lg:h-[40px] absolute w-full">
        <h1 className="dark:text-gray-400 font-bold text-sm lg:text-lg">
          Teams
        </h1>
        {showJoinForm ? (
          <JoinForm afterSubmit={() => setShowJoinForm(false)} />
        ) : (
          <button
            onClick={handleJoinButtonClick}
            className="text-blue-500 dark:text-blue-200 text-sm w-fit"
          >
            Have a joining code? Click to request.
          </button>
        )}
      </div>
      {my_teams.length === 0 ? (
        <div className="p-6 pt-2 pl-10 h-3/4 mt-1 border-dashed border border-gray-300 flex justify-center items-center bg-gray-100 dark:bg-gray-800 text-sm lg:text-lg">
          <NewTeam
            class={"dark:text-gray-200 border dark:border-gray-400 p-2"}
            name={"Create your first team"}
          />
        </div>
      ) : (
        <div className="flex max-h-full pt-[45px] flex-1">
          <div className="rounded-md h-full w-full overflow-y-auto flex flex-col gap-1 lg:gap-2">
            <div className="flex text-gray-600">
              <div className="w-1/3">
                <p className="text-sm lg:text-lg">Name</p>
              </div>
              <div className="flex-1 flex justify-center gap-4">
                <p className="text-sm lg:text-lg">Creator</p>
              </div>
              <div className="w-1/5"></div>
            </div>
            {my_teams.map((item) => (
              <TeamListing key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;
