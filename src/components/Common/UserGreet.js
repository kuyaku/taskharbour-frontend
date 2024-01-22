import { useSelector } from "react-redux";
import NewProject from "./Buttons/NewProject";
import NewTeam from "./Buttons/NewTeam";
import UserAvatar from "./UserAvatar";

const UserGreet = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div className="p-4 lg:pl-10 flex gap-4">
      <h1 className="text-lg lg:text-2xl dark:text-gray-100">
        Hi, {user.username}
      </h1>
      <NewTeam
        class={
          "p-0.5 px-2 rounded-md bg-orange-600 text-white text-sm lg:text-lg"
        }
        name={"New Team"}
      />
      <NewProject
        class={
          "p-0.5 px-2 rounded-md bg-green-600 text-white text-sm lg:text-lg"
        }
        name={"New Project"}
      />
    </div>
  );
};

export default UserGreet;
