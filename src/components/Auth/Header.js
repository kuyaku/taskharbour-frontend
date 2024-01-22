import { Link } from "react-router-dom";
import Logo from "../Common/Logo";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div className="flex justify-center  p-6">
      <div className="">
        <Link to={"/"}>
          <Logo color={"text-blue-800"} />
        </Link>
      </div>
      <div className="flex-1 bg-blue flex justify-end font-mono font-bold">
        {user ? <button>About</button> : <Link to={"/auth/login"}>Login</Link>}
      </div>
    </div>
  );
};

export default Header;
