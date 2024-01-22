import { GitHub, Linkedin } from "react-feather";
const Footer = () => {
  return (
    <div className="w-full p-6 flex flex-col-reverse md:flex-row bg-gray-950">
      <div className="flex justify-center pt-4 md:pt-0 md:w-52">
        <p className="text-gray-400">©Copyright: TaskHarbour</p>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 flex md:justify-center">
          <p className="text-gray-500">
            Made with ❤️ by <span className="font-bold">@kyks</span>
          </p>
        </div>
        <div className="flex gap-4 justify-end text-gray-400 items-end md:w-52">
          <GitHub className="cursor-pointer" />
          <Linkedin className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
