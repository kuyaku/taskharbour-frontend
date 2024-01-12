import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../utils/appControlsSlice";
import { Moon, Sun, ToggleRight } from "react-feather";

const ToggleMode = () => {
  const dispatch = useDispatch();
  const dark_mode = useSelector((store) => store.appControl.mode);

  const handleModeSwitch = () => {
    dispatch(toggleMode());
  };

  return (
    <div className="dark:text-white">
      {dark_mode ? (
        <div className="flex gap-2 items-center">
          {/* <Sun className="" /> */}
          <ToggleRight onClick={handleModeSwitch} className="w-8 h-8" />
          <Moon className="fill-white" />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <ToggleRight onClick={handleModeSwitch} className="w-8 h-8" />
          <Sun className="fill-yellow-200" />
          {/* <Moon /> */}
        </div>
      )}
    </div>
  );
};

export default ToggleMode;
