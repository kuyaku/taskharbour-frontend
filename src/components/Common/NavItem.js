import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
const NavItem = ({ icon, itemName, current_page, device_size }) => {
  const dark_mode = useSelector((store) => store.appControl.mode);

  const modifySVG = (svg) => {
    let width = "23";
    if (device_size === "sm" || device_size === "md") {
      width = "18";
    }
    svg.setAttribute("height", width);
    svg.setAttribute("width", width);
    if (dark_mode) {
      svg.setAttribute("fill", "white");
    } else {
      svg.removeAttribute("fill");
    }
    return svg;
  };

  return (
    <div
      style={{ border: current_page ? "2px solid gray" : "" }}
      className="flex gap-2 text-lg p-2 hover:bg-blue-100 hover:pl-3 dark:hover:bg-gray-900 hover:text-blue-600 dark:hover:text-blue-500 border-blue-700 dark:hover:border-none hover:border-r-4 rounded-md"
    >
      <ReactSVG src={icon} beforeInjection={(svg) => modifySVG(svg)} />
      {itemName && <h2>{itemName}</h2>}
    </div>
  );
};

export default NavItem;
