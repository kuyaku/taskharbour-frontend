import { Link } from "react-router-dom";
import Logo from "../Common/Logo";

const Header = () => {
  return (
    <div className="flex justify-center  p-6">
      <div>
        <Link to={"register"}>
          <Logo />
        </Link>
      </div>
      <div className="flex-1 bg-blue flex justify-end font-mono font-bold">
        <Link to={"/auth/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Header;
