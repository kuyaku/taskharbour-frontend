import { logoutAsync } from "../../utils/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { user, accessToken } = useSelector((store) => store.auth);

  console.log(user, accessToken);

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAsync());
  };

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <div>
      This is homepage
      <div>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
