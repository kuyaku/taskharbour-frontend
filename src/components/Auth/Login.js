import { Link, Navigate } from "react-router-dom";
import InputField from "../Common/InputField";
import Logo from "../Common/Logo";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, logoutAsync } from "../../utils/authSlice";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      loginAsync({ email: "yateshbiet@gmail.com", password: "Kunwar@1234" })
    );
  };

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const handleEmailFieldChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordFieldChange = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="bg-white drop-shadow-md p-4 md:p-6 md:px-10 h-fit w-[420px] py-6 flex flex-col gap-1 md:gap-3 -mt-20">
      <div className="flex justify-center">
        <Logo />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      {user ? <p>{user.username}</p> : <p></p>}
      <div className="md:px-5">
        <p className="text-center text-md  md:text-lg text-gray-600">
          A free, simple and elegant solution for project management.
        </p>
      </div>
      <div className="">
        <h3 className="text-center font-semibold text-2xl text-gray-700 mt-6">
          Log in
        </h3>
        <p className="text-center text-gray-800">
          Not a member?{" "}
          <span className="text-blue-700">
            <Link to={"/auth/register"}>Join now.</Link>
          </span>
        </p>
      </div>
      <form action="" method="" className="flex flex-col gap-3">
        <InputField
          placeholder="Email Address"
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailFieldChange}
        />
        <InputField
          placeholder="Password"
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordFieldChange}
        />
        <InputField type="submit" />
      </form>
    </div>
  );
};

export default Login;
