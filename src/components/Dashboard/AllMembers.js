import Member from "./Member";
const AllMembers = ({ members, label, is_admin, user_is_admin }) => {
  const filteredMembers = members.filter((item) => item.is_admin === is_admin);
  return (
    <div className="flex gap-2 flex-col">
      <h3 className="text-gray-500 text-sm lg:text-lg">{label}</h3>
      <div className="flex gap-2 flex-wrap">
        {filteredMembers.length === 0 ? (
          <p className="text-center w-full">{label} (0)</p>
        ) : (
          filteredMembers.map((item) => (
            <Member key={item.id} data={item} user_is_admin={user_is_admin} />
          ))
        )}
      </div>
    </div>
  );
};
export default AllMembers;
