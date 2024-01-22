import { Menu, Settings } from "react-feather";
import Logo from "./Logo";
import ToggleMode from "./ToggleMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideNav } from "../../utils/appControlsSlice";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.auth.user);
  const device_size = useSelector((store) => store.appControl.device_size);
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    dispatch(toggleSideNav());
  };
  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-900 border-b-2 border-b-gray-200 dark:border-b-black p-4 flex fixed w-full z-20 h-[70px]">
        <div className="pr-4">
          <Menu
            onClick={handleMenuClick}
            className="dark:text-gray-200 cursor-pointer"
          />
        </div>
        <div>
          <Link to={"/"}>
            <Logo
              color={"text-blue-800 dark:text-gray-200"}
              device_size={device_size}
            />
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-10">
          {device_size === "sm" || device_size === "md" ? (
            <div></div>
          ) : (
            <ToggleMode />
          )}
          <div className="flex gap-4 items-center">
            {device_size === "sm" || device_size === "md" ? (
              <div></div>
            ) : (
              <Settings className="dark:text-white" />
            )}
            <UserAvatar user={user} />
          </div>
        </div>
      </div>
      {/* <div className="p-4 h-18"></div> */}
    </div>
  );
};

export default Header;
