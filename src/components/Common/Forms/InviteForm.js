import { useEffect, useState } from "react";
import client from "../../../api/client";

const InviteForm = (props) => {
  const [unique_code, setUnique_code] = useState("");
  const { id, name } = props.data;

  useEffect(() => {
    client
      .post(`my_teams/${id}/generate_unique_join_code/`, {})
      .then((data) => setUnique_code(data.unique_code));
  }, []);

  return (
    <div className="text-black dark:text-gray-200 p-2">
      <div>
        <h1 className="text-lg text-gray-500 dark:text-gray-400">
          Team:{" "}
          <span className="font-bold text-xl text-gray-700 dark:text-gray-200">
            {name}
          </span>
        </h1>
        <div className="flex gap-2">
          <h2 className="text-lg text-gray-500 dark:text-gray-400">
            Unique joining code:{" "}
          </h2>
          <div className="border px-3 py-1 rounded-md">
            <p>{unique_code}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Share this code with people, allowing them to make joining requests
            for the team.
          </p>
          <p className="text-red-400">
            This code will expire after limited time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InviteForm;
