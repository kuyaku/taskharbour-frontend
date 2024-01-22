import { useState } from "react";
import { join_team } from "../../../utils/userDataSlice";
import { useDispatch } from "react-redux";

const JoinForm = (props) => {
  const dispatch = useDispatch();
  const [uniqueCode, setUniqueCode] = useState(null);
  const [codeError, setCodeError] = useState(null);

  const handleJoinFormSubmit = (e) => {
    e.preventDefault();
    if (!uniqueCode) {
      setCodeError("Unique code is required!");
      return;
    }
    dispatch(join_team({ unique_code: uniqueCode }));
    props.afterSubmit();
  };

  return (
    <div>
      <form className="flex gap-1 lg:gap-2 pb-2">
        <div className={codeError ? "border border-red-500 h-fit" : "h-fit"}>
          <input
            className="px-2 py-1 border outline-none text-sm"
            placeholder="Joining code"
            onChange={(e) => setUniqueCode(e.target.value)}
          />
        </div>
        <button
          onClick={(e) => handleJoinFormSubmit(e)}
          className="bg-orange-600 px-2 py-1 rounded-md text-gray-100 text-sm whitespace-nowrap"
        >
          Make request
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
