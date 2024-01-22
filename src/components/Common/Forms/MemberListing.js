import { Minus, Plus } from "react-feather";

const MemberListing = ({ handleMemberClick, user, selected }) => {
  return (
    <div
      onClick={() => handleMemberClick(user)}
      className="relative w-fit border border-gray-500 rounded-lg"
    >
      <p className="px-2 pr-6">{user.username}</p>
      <div className="w-fit absolute top-1 right-1 bg-white rounded-lg">
        {selected ? (
          <Minus className="w-[15px] h-[15px] text-black" />
        ) : (
          <Plus className="w-[15px] h-[15px] text-black" />
        )}
      </div>
    </div>
  );
};

export default MemberListing;
