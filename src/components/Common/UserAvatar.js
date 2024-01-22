import { useEffect, useState } from "react";
import { getRandomColor, getUserInitials } from "../../utils/utilities";
import { useSelector } from "react-redux";

const UserAvatar = ({ user }) => {
  const [bgColor, setBgColor] = useState("blue-500");
  const [showUserInfo, setShowUserInfo] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user"));
  const name = getUserInitials(user.username, user.first_name, user.last_name);

  useEffect(() => {
    const color = getRandomColor();
    setBgColor(color);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className={`text-gray-100 rounded-[50%] p-1 w-[35px] h-[35px] flex items-center justify-center relative`}
    >
      <p
        className="select-none"
        onMouseEnter={() => setShowUserInfo(true)}
        onMouseLeave={() => setShowUserInfo(false)}
      >
        {name.toUpperCase()}
      </p>
      {showUserInfo && (
        <p className="absolute top-[100%] right-0">{user.username}</p>
      )}
    </div>
  );
};

export default UserAvatar;
