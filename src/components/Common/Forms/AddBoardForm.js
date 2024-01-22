import { BOARD_COLORS } from "../../../utils/constants";
import ColorPallete from "../ColorPallete";
import InputField from "./InputField";
import TextField from "./TextField";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormError from "./FormError";
import MemberSelection from "./MemberSelection";
import { create_new_board } from "../../../utils/userDataSlice";

const AddBoardForm = ({ data }) => {
  const { team, creator, id } = data;
  // user is either creator or is admin of the team, related to the project, it is made sure in the project section itself
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [error, setError] = useState({ name: null });
  const [selectedColor, setSelectedColor] = useState("#FFA500");
  const [selectedPeople, setSelectedPeople] = useState([]);

  // currently I am storing complete user info in selectedPeople, I can optimize with only ids

  // console.log("selected people: ", selectedPeople);

  const teamAdmins = team.name && team?.members.filter((item) => item.is_admin);
  const teamNonAdmins =
    team.name && team?.members.filter((item) => !item.is_admin);

  useEffect(() => {
    if (team.name) {
      setSelectedPeople(team.members); // initially all members are selected
    } else {
      setSelectedPeople([creator]);
    }
  }, []);

  const handleSelectedPeopleChange = (newSelectedPeople) => {
    // console.log("new selected people: ", newSelectedPeople);
    setSelectedPeople((selectedPeople) => [
      ...newSelectedPeople,
      ...teamAdmins,
    ]); // team admins are always selected
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleInputFieldChange = (e) => {
    setName(e.target.value);
    setError({ ...error, name: null });
  };

  const handleTextFieldChange = (e) => {
    setDescripion(e.target.value);
    setError({ ...error, description: null });
  };

  const boardColors = BOARD_COLORS;

  const handleBoardFormSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 && description.length === 0) {
      setError({
        description: "Description is required!",
        name: "Name is required!",
      });
      return;
    }
    if (description.length === 0) {
      setError({ ...error, description: "Description is required!" });
      return;
    }
    if (name.length === 0) {
      setError({ ...error, name: "Name is required!" });
      return;
    }
    const selectedPeopleIds = selectedPeople.map((item) => item.id);
    // console.log(selectedPeopleIds);
    const data = {
      title: name,
      description,
      color: selectedColor,
      people: selectedPeopleIds,
    };
    console.log(data);
    dispatch(create_new_board({ project_id: id, data }));
  };

  return (
    <div className="flex p-2 text-sm lg:text-lg justify-center flex-col gap-2 items-center">
      <h1>Create New Board</h1>
      <form className="w-full flex flex-col gap-3">
        <InputField
          placeholder="Name of the board"
          onChange={handleInputFieldChange}
        />
        {error?.name && <FormError message={error.name} />}
        <TextField
          placeholder={"What this board is about?"}
          onChange={handleTextFieldChange}
        />
        {error?.description && <FormError message={error.description} />}

        <div className="flex gap-2">
          <h3>Select Color: </h3>
          <ColorPallete
            selectedColor={selectedColor}
            colors={boardColors}
            handleSelectColor={handleSelectColor}
          />
        </div>
        {team.name &&
          (teamNonAdmins.length > 0 ? (
            <div>
              <h3>Select people</h3>
              <MemberSelection
                members={teamNonAdmins}
                handleSelectedPeopleChange={handleSelectedPeopleChange}
              />
            </div>
          ) : (
            <div>
              <h3>Select people</h3>
              <p className="text-gray-500">
                No members to select, since all members are admins!
              </p>
            </div>
          ))}
        <button
          className="bg-blue-600 p-2 w-fit rounded-sm text-white"
          onClick={handleBoardFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBoardForm;
