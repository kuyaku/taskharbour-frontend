import { useState } from "react";
import MemberListing from "./MemberListing";

const MemberSelection = ({ members, handleSelectedPeopleChange }) => {
  const [selectedPeople, setSelectedPeople] = useState([]);

  //   console.log("from member selection: ", selectedPeople);

  const handleMemberClick = (member) => {
    const isAlreadySelected = selectedPeople.includes(member);
    if (isAlreadySelected) {
      const newSelectedPeople = selectedPeople.filter(
        (item) => item.id !== member.id
      );
      setSelectedPeople(newSelectedPeople);
      handleSelectedPeopleChange(newSelectedPeople);
    } else {
      const newSelectedPeople = [...selectedPeople, member];
      setSelectedPeople(newSelectedPeople);
      handleSelectedPeopleChange(newSelectedPeople);
    }
  };

  const nonSelectedMembers = members.filter(
    (item) => !selectedPeople.includes(item)
  );

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-end">Selected people</h2>
        <div className="border p-4 rounded-md border-gray-500 flex gap-2 flex-wrap">
          {selectedPeople.length === 0 && (
            <p className="text-red-500">
              Remember all admins are always selected. By default all people of
              board are selected! If you explicitly select members, then only
              admins are selected by default.
            </p>
          )}
          {selectedPeople.map((item) => (
            <MemberListing
              key={item.id}
              user={item}
              handleMemberClick={handleMemberClick}
              selected={true}
            />
          ))}
        </div>
        <div className="flex gap-2 flex-wrap justify-around">
          {nonSelectedMembers.map((item) => (
            <MemberListing
              key={item.id}
              user={item}
              handleMemberClick={handleMemberClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberSelection;
