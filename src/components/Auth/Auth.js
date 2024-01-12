import Header from "./Header";
import Section from "./Section";
import Footer from "../Common/Footer";

const Auth = () => {
  return (
    <div className="min-h-screen w-full flex justify-center flex-col items-center bg-[url('./assets/images/background/bg1.jpg')] bg-cover">
      <div className="w-full min-h-screen md:w-3/5 flex flex-col">
        <Header />
        <Section />
      </div>
      <div className="w-full bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
