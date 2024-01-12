import { Link } from "react-router-dom";
import InputField from "../Common/InputField";
import Logo from "../Common/Logo";

const Signup = () => {
  return (
    <div className="bg-white drop-shadow-md p-4 md:p-6 md:px-10 h-fit w-[420px] py-6 flex flex-col gap-1 md:gap-3 -mt-20">
      <div className="flex justify-center">
        <Logo />
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
        <InputField placeholder="Email Address" type="email" label="Email" />
        <InputField placeholder="Password" type="password" label="Password" />
        <InputField
          placeholder="Password"
          type="password"
          label="Confirm Password"
        />
        <InputField type="submit" />
      </form>
    </div>
  );
};

export default Signup;
