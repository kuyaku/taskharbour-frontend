import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
const NavItem = (props) => {
  const dark_mode = useSelector((store) => store.appControl.mode);

  const modifySVG = (svg) => {
    svg.setAttribute("height", "23");
    svg.setAttribute("width", "23");
    if (dark_mode) {
      svg.setAttribute("fill", "white");
    } else {
      svg.removeAttribute("fill");
    }
    return svg;
  };

  return (
    <div className="flex gap-2 text-lg p-2 hover:bg-blue-100 hover:pl-3 dark:hover:bg-gray-900 hover:text-blue-600 dark:hover:text-blue-500 border-blue-700 dark:hover:border-none hover:border-r-4 rounded-md">
      <ReactSVG src={props.icon} beforeInjection={(svg) => modifySVG(svg)} />
      <h2>{props.itemName}</h2>
    </div>
  );
};

export default NavItem;
