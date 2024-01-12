import { Settings, User } from "react-feather";
import Logo from "./Logo";
import ToggleMode from "./ToggleMode";

const Header = () => {
  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-b-gray-200 dark:border-b-black p-4 flex fixed w-full z-10 h-[70px]">
        <div>
          <Logo />
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-10">
          <ToggleMode />
          <div className="flex gap-4 items-center">
            <Settings className="dark:text-white" />
            <User className="dark:text-white" />
          </div>
        </div>
      </div>
      {/* <div className="p-4 h-18"></div> */}
    </div>
  );
};

export default Header;
