import { logoutAsync } from "../../utils/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Header from "../Auth/Header";
import Section from "../Auth/Section";
import Footer from "../Common/Footer";
import Logo from "../Common/Logo";

const HomePage = () => {
  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAsync());
  };

  return (
    <div className="min-h-screen w-full flex justify-center flex-col items-center bg-[url('./assets/images/background/bg1.jpg')] bg-cover">
      <div className="w-full min-h-screen md:w-3/5 flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center px-3">
          <div className="flex justify-center flex-col items-center gap-4">
            <Logo color={"text-blue-800"} />
            <div>
              <h1 className="text-2xl lg:text-4xl text-center font-bold text-gray-800">
                A <span className="text-orange-600">free</span>,{" "}
                <span className="text-orange-600">simple</span> and
                <br /> <span className="text-orange-600">elegant</span> solution
                for project management.
              </h1>
            </div>
            <div>
              {user ? (
                <Link to={"/dashboard"}>
                  <button className="text-large lg:text-xl p-2 bg-blue-600 text-white rounded-md">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link to={"auth/login"}>
                    <button className="text-large lg:text-xl p-2 bg-blue-600 text-white rounded-md font-bold">
                      Login
                    </button>
                  </Link>
                  <Link to={"auth/register"}>
                    <button className="text-large lg:text-xl p-2 bg-orange-600 text-white rounded-md font-bold">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
