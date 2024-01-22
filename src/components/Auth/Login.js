import { Link, Navigate } from "react-router-dom";
import InputField from "../Common/InputField";
import Logo from "../Common/Logo";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, logoutAsync } from "../../utils/authSlice";
import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../utils/utilities";
import FormError from "../Common/Forms/FormError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [error, setError] = useState({ email: null, password: null });
  const loginStatus = useSelector((store) => store.auth.authStatus.login);

  const handleLogin = (e) => {
    e.preventDefault();

    const ValidEmail = isValidEmail(email);
    const ValidPassword = isValidPassword(password);

    if (!ValidEmail && !ValidPassword) {
      setError({
        email: "Enter valid email",
        password: "Password doesn't meet the requirements!",
      });
      return;
    }

    if (!ValidEmail) {
      setError({ email: "Enter valid email", password: null });
      return;
    }

    if (!ValidPassword) {
      setError({
        email: null,
        password: "Password doesn't meet the requirements!",
      });
      return;
    }

    dispatch(
      loginAsync({
        email: email,
        password: password,
      })
    );
  };

  const handleEmailFieldChange = (e) => {
    setEmail(e.target.value);
    setError({ ...error, email: null });
  };

  const handlePasswordFieldChange = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: null });
  };

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="bg-white drop-shadow-md p-4 md:p-6 md:px-10 h-fit w-[420px] py-6 flex flex-col gap-1 md:gap-3 -mt-20">
      <div className="flex justify-center">
        <Logo color="text-blue-800" />
      </div>
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
      {loginStatus === "Error" && (
        <FormError message={"User credentials are not correct!"} />
      )}
      <form className="flex flex-col gap-3">
        <InputField
          placeholder="Email Address"
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailFieldChange}
        />
        {error.email && <FormError message={error.email} />}
        <InputField
          placeholder="Password"
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordFieldChange}
        />
        {error.password && <FormError message={error.password} />}

        <InputField type="submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default Login;
