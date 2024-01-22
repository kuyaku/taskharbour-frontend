import { useSelector } from "react-redux";
import TimeAgo from "../Common/TimeAgo";
import { useState } from "react";
import SelectTeam from "../Common/Forms/SelectTeam";
import { ChevronDown, ChevronUp } from "react-feather";
import AllMembers from "./AllMembers";
import { check_if_admin } from "../../utils/utilities";

const Project = ({ data }) => {
  const user = useSelector((store) => store.auth.user);
  const { title, description, team, creator, created_at } = data;
  const [showTeamForm, setShowTeamForm] = useState(false);
  const my_teams = useSelector((store) => store.userData.my_teams);
  const [teamId, setTeamId] = useState("None");
  const [showAllMembers, setShowAllMembers] = useState(false);

  const is_admin = check_if_admin(user, creator, team);

  const handleTeamSelectChange = (e) => {
    setTeamId(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="border-dashed border-b border-b-gray-600 pb-4 mb-4">
        <div className="flex">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col">
              {is_admin && (
                <p className="bg-green-700 text-gray-100 w-fit px-1 rounded-lg text-sm">
                  Admin
                </p>
              )}
              <h1 className="text-2xl">
                {title}{" "}
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  by{" "}
                  {creator.username === user.username ? "me" : creator.username}
                </span>
              </h1>
              <div className="flex gap-2">
                {team.name === "" && (
                  <div className="flex gap-2">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Personal Project
                    </p>
                  </div>
                )}
                {is_admin && (
                  <button className="border rounded-md w-fit px-2 mt-1">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <TimeAgo timestamp={created_at} />
        </div>
        <div className="mt-2">
          <p className="p-2 rounded-xl border-gray-700 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {is_admin && !team.name && showTeamForm ? (
          <div className="flex items-center flex-col gap-3">
            <div className="w-full">
              <SelectTeam
                my_teams={my_teams}
                handleTeamSelectChange={handleTeamSelectChange}
              />
            </div>
            <button className="bg-orange-600 text-gray-100 p-1 px-2 rounded-md">
              Add team
            </button>
          </div>
        ) : team.name ? (
          <div className="flex flex-col gap-4">
            <div className="flex">
              <h3 className="text-gray-600 dark:text-gray-300 flex-1">
                Team:{" "}
                <span className="text-xl text-gray-700 font-bold dark:text-gray-100">
                  {team.name}{" "}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {" "}
                    by{" "}
                    {team.created_by.username === user.username
                      ? "me"
                      : team.created_by.username}
                  </span>
                </span>
              </h3>
            </div>
            <div className="flex justify-end">
              {showAllMembers ? (
                <button
                  className="flex"
                  onClick={() => setShowAllMembers(false)}
                >
                  Hide all members <ChevronUp />
                </button>
              ) : (
                <button
                  className="flex"
                  onClick={() => setShowAllMembers(true)}
                >
                  Show all members <ChevronDown />
                </button>
              )}
            </div>
            {showAllMembers && (
              <div className="flex flex-col gap-2 border-t border-dashed border-t-gray-600">
                <AllMembers
                  members={team.members}
                  is_admin={true}
                  label={"Admins"}
                />
                <AllMembers
                  members={team.members}
                  is_admin={false}
                  label={"Members"}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <p className="flex-1">No team assigned!</p>
            {is_admin && (
              <button
                onClick={() => setShowTeamForm(true)}
                className="border p-1 px-2 text-sm"
              >
                Add team
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
