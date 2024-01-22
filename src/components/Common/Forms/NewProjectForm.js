import { useState } from "react";
import InputField from "./InputField";
import TextField from "./TextField";
import FormError from "./FormError";
import { create_new_project } from "../../../utils/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectTeam from "./SelectTeam";

const NewProjectForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [teamId, setTeamId] = useState("None");
  const [error, setError] = useState({ name: null, description: null });
  const my_teams = useSelector((store) => store.userData.my_teams);

  const handleInputFieldChange = (e) => {
    setName(e.target.value);
    setError({ ...error, name: null });
  };

  const handleTextFieldChange = (e) => {
    setDescripion(e.target.value);
    setError({ ...error, description: null });
  };

  const handleProjectFormSubmit = (e) => {
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

    const data = {
      title: name,
      description: description,
    };

    if (teamId !== "None") {
      data.team = teamId;
    }

    dispatch(create_new_project(data));
  };

  const handleTeamSelectChange = (e) => {
    setTeamId(e.target.value);
  };

  return (
    <div className="flex justify-center flex-col gap-2 items-center p-2">
      <h1>Create New Project</h1>
      <form className="w-full flex flex-col gap-3">
        <InputField
          placeholder="Name of the project"
          onChange={handleInputFieldChange}
          required={true}
        />
        {error?.name && <FormError message={error.name} />}
        <TextField
          placeholder="What this project is about?"
          onChange={handleTextFieldChange}
        />
        {error?.description && <FormError message={error.description} />}
        <SelectTeam
          my_teams={my_teams}
          handleTeamSelectChange={handleTeamSelectChange}
        />
        <button
          className="bg-blue-600 p-2 w-fit rounded-sm"
          onClick={handleProjectFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;
