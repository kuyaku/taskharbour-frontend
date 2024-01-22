import { Link } from "react-router-dom";
import InputField from "../Common/InputField";
import Logo from "../Common/Logo";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import FormError from "../Common/Forms/FormError";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils/utilities";
import { resetSignupStatus, signupAsync } from "../../utils/authSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [error, setError] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    username: null,
  });

  const signupStatus = useSelector((store) => store.auth.authStatus.signup);

  if (signupStatus.status === "failed") {
    const submissionError = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
    if (signupStatus.emailError) {
      submissionError.email = signupStatus.emailError[0];
    }

    if (signupStatus.usernameError) {
      submissionError.username = signupStatus.usernameError[0];
    }
    setError(submissionError);
    dispatch(resetSignupStatus());
  }

  const handleEmailFieldChange = (e) => {
    setEmail(e.target.value);
    setError({ ...error, email: null });
  };

  const handlePasswordFieldChange = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: null });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError({ ...error, username: null });
  };

  const handleConfirmPasswordFieldChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setError({ ...error, confirmPassword: "Passwords doesn't match" });
    } else {
      setError({ ...error, confirmPassword: null });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    const validUsername = isValidUsername(username);

    const validationError = {
      username: null,
      email: null,
      password: null,
    };

    if (!validUsername) {
      validationError.username =
        "Username should be atleast 3 characters long, and can have alphanumerics and @, -, _ only.";
    }

    if (!validEmail) {
      validationError.email = "Enter valid email";
    }

    if (!validPassword) {
      validationError.password = "Password doesn't meet the requirements!";
    }

    if ((validEmail, validUsername, validPassword)) {
      dispatch(
        signupAsync({ username: username, password: password, email: email })
      );
    } else {
      setError(validationError);
    }
  };

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="bg-white drop-shadow-md p-4 md:p-6 md:px-10 h-fit w-[420px] py-6 flex flex-col gap-1 md:gap-3 -mt-20">
      <div className="flex justify-center">
        <Logo color={"text-blue-800"} />
      </div>
      <div className="md:px-5">
        <p className="text-center text-md  md:text-lg text-gray-600">
          A free, simple and elegant solution for project management.
        </p>
      </div>
      <div className="">
        <h3 className="text-center font-semibold text-2xl text-gray-700 mt-6">
          Get Started
        </h3>
        <p className="text-center text-gray-800">
          Already a member?{" "}
          <span className="text-blue-700">
            <Link to={"/auth/login"}>Login now.</Link>
          </span>
        </p>
      </div>
      <form action="" method="" className="flex flex-col gap-3">
        <InputField
          onChange={handleUsernameChange}
          placeholder="Username"
          type="text"
          label="Username"
        />
        {error.username && <FormError message={error.username} />}

        <InputField
          onChange={handleEmailFieldChange}
          placeholder="Email Address"
          type="email"
          label="Email"
        />
        {error.email && <FormError message={error.email} />}
        <InputField
          onChange={handlePasswordFieldChange}
          placeholder="Password"
          type="password"
          label="Password"
        />
        {error.password && <FormError message={error.password} />}
        <InputField
          onChange={handleConfirmPasswordFieldChange}
          placeholder="Password"
          type="password"
          label="Confirm Password"
        />
        {error.confirmPassword && <FormError message={error.confirmPassword} />}
        <InputField type="submit" onClick={handleSignup} />
      </form>
    </div>
  );
};

export default Signup;
