import { useState } from "react";
import { getRandomColor, getUserInitials } from "../../utils/utilities";

const Member = ({ data, user_is_admin }) => {
  const [showUsername, setShowUsername] = useState(true);
  const { first_name, last_name, username, is_admin } = data;
  const color = getRandomColor();
  const userInitials = getUserInitials(username, first_name, last_name);
  return (
    <div className="w-[100px] rounded-xl border border-gray-200 overflow-hidden">
      <div
        style={{ backgroundColor: color }}
        className="h-[50px] text-gray-100 flex items-center justify-center"
      >
        <p className="text-3xl">{userInitials}</p>
      </div>
      <div
        onMouseEnter={() => {
          user_is_admin && !is_admin && setShowUsername(false);
        }}
        onMouseLeave={() => {
          user_is_admin && !is_admin && setShowUsername(true);
        }}
      >
        {showUsername ? (
          <h3 className="p-1 text-center bg-gray-200 dark:bg-gray-800 h-[30px]">
            {username.substring(0, 10)}
          </h3>
        ) : (
          <button className="text-sm text-gray-100 bg-green-700 w-full font-bold p-1 h-[30px]">
            + Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default Member;
