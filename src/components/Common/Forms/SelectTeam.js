const SelectTeam = ({ my_teams, handleTeamSelectChange }) => {
  return (
    <div className="flex gap-2">
      <label htmlFor="select-team">Select team</label>
      <select
        onChange={handleTeamSelectChange}
        id="select-team"
        className="text-black p-1 outline-none flex-1 rounded-md"
      >
        <option>None</option>
        {my_teams.map(
          (item) =>
            item.is_admin && (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default SelectTeam;
