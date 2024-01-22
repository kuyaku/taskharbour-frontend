import { useDispatch } from "react-redux";
import { showModal } from "../../utils/appControlsSlice";
import JoinRequest from "./Buttons/JoinRequest";
import InviteButton from "./Buttons/InviteButton";

const TeamListing = (props) => {
  const dispatch = useDispatch();

  const handleTeamClick = (data) => {
    dispatch(showModal({ children: "team_info", data: data }));
  };

  const { name, created_by, is_admin } = props.data;
  const shortTeam = name.length > 15 ? name.slice(0, 15) + "..." : name;
  return (
    <div
      className="bg-gray-100 dark:text-gray-200 dark:bg-gray-800 p-2 px-4 rounded-sm flex gap-2 text-sm lg:text-lg"
      onClick={(e) => {
        e.stopPropagation();
        handleTeamClick(props.data);
      }}
    >
      <div className="w-1/3">
        <p>{shortTeam}</p>
      </div>
      <div className="flex flex-1 justify-center">
        <p>{created_by.username}</p>
      </div>
      <div className="flex gap-2 w-1/5 justify-end">
        {is_admin && (
          <>
            {/* <JoinRequest data={props.data} /> */}
            <InviteButton data={props.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default TeamListing;
