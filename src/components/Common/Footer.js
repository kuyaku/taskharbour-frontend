import { GitHub, Linkedin } from "react-feather";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="w-full p-6 flex flex-col-reverse md:flex-row bg-gray-950">
      <div className="flex justify-center pt-4 md:pt-0 md:w-52">
        <p className="text-gray-400">©Copyright: TaskHarbour</p>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 flex md:justify-center">
          <p className="text-gray-500">
            Made with ❤️ by{" "}
            <span className="font-bold">
              {" "}
              <Link
                to={
                  "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFE4xBN25aZ1AAAAY0zEX5o2cOUAiis1o_9ntGnTJwpQNFJaUXoHz2u_kYwEun_hG0QMM41UVQgsG0WoyFZE5_H80SjZ6L1f2_lTMFQoOnmt_0XvNUih96UNcgEc-vaN-7oQPU=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fkunwar-yatesh-kumar-73579a182%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app"
                }
              >
                @kyks
              </Link>
            </span>
          </p>
        </div>
        <div className="flex gap-4 justify-end text-gray-400 items-end md:w-52">
          <Link to={"https://github.com/kuyaku"}>
            <GitHub className="cursor-pointer" />
          </Link>
          <Link
            to={
              "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFE4xBN25aZ1AAAAY0zEX5o2cOUAiis1o_9ntGnTJwpQNFJaUXoHz2u_kYwEun_hG0QMM41UVQgsG0WoyFZE5_H80SjZ6L1f2_lTMFQoOnmt_0XvNUih96UNcgEc-vaN-7oQPU=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fkunwar-yatesh-kumar-73579a182%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app"
            }
          >
            <Linkedin className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
