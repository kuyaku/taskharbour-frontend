import { useSelector } from "react-redux";
import InviteButton from "../Common/Buttons/InviteButton";
import TimeAgo from "../Common/TimeAgo";
import AllMembers from "./AllMembers";
import JoinRequest from "../Common/Buttons/JoinRequest";

const Team = ({ data }) => {
  const user = useSelector((store) => store.auth.user);
  const { id, created_at, created_by, name, description, is_admin, members } =
    data;
  return (
    <div className="p-4">
      <div className="border-dashed border-b border-b-gray-600 pb-4 mb-4">
        <div className="flex">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col w-full">
              {is_admin && (
                <p className="text-gray-100 bg-green-700 px-1 rounded-md text-sm w-fit">
                  Admin
                </p>
              )}
              <h1 className="text-xl lg:text-2xl">
                {name}{" "}
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  by{" "}
                  {created_by.username === user.username
                    ? "me"
                    : created_by.username}
                </span>
              </h1>
            </div>
          </div>
          <TimeAgo timestamp={created_at} />
        </div>
        <div className="flex gap-2 flex-wrap w-full text-sm lg:text-lg">
          {is_admin && (
            <>
              <button className="border border-gray-400 dark:border-color-200 px-2 rounded-sm dark:bg-gray-700">
                Edit
              </button>
              <InviteButton data={data} />
              <JoinRequest data={data} />
            </>
          )}

          <button className=" px-2 rounded-sm text-gray-100 bg-red-700">
            Exit Team
          </button>
        </div>
        <div className="mt-2">
          <p className="p-2 rounded-xl border-gray-700 text-gray-700 dark:text-gray-300 text-sm lg:text-lg">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <AllMembers
          members={members}
          is_admin={true}
          label={"Admins"}
          user_is_admin={is_admin}
        />
        <AllMembers
          members={members}
          is_admin={false}
          label={"Members"}
          user_is_admin={is_admin}
        />
      </div>
    </div>
  );
};

export default Team;
