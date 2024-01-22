import { useState } from "react";
import InputField from "./InputField";
import TextField from "./TextField";
import { useDispatch } from "react-redux";
import { create_new_team } from "../../../utils/userDataSlice";
import FormError from "./FormError";

const NewTeamForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [error, setError] = useState({ name: null });

  const handleInputFieldChange = (e) => {
    setName(e.target.value);
    setError({ ...error, name: null });
  };

  const handleTextFieldChange = (e) => {
    setDescripion(e.target.value);
    setError({ ...error, description: null });
  };

  const handleTeamFormSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setError({
        description: "Description is required!",
        name: "Name is required!",
      });
      return;
    }

    if (name.length === 0) {
      setError({ ...error, name: "Name is required!" });
      return;
    }

    const data = {
      name: name,
      description: description,
    };
    dispatch(create_new_team(data));
  };

  return (
    <div className="flex justify-center p-2 flex-col gap-2 items-center">
      <h1>Create New Team</h1>
      <form className="w-full flex flex-col gap-3">
        <InputField
          placeholder="Name of the team"
          onChange={handleInputFieldChange}
        />
        {error?.name && <FormError message={error.name} />}
        <TextField
          placeholder={"What this team is about?"}
          onChange={handleTextFieldChange}
        />
        <button
          className="bg-blue-600 p-2 w-fit rounded-sm text-white"
          onClick={handleTeamFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTeamForm;
