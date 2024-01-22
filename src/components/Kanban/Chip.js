import { X } from "react-feather";

const Chip = ({ name, color, addControl, handleChipRemoval }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`px-2 py-1 text-gray-50 rounded-lg text-xs font-bold flex gap-1`}
    >
      <h1 className="flex-1">{name.toUpperCase()}</h1>
      {addControl && (
        <X
          className="w-[20px] h-[20px] bg-white rounded-[50%] text-black"
          onClick={() => handleChipRemoval(name, color)}
        />
      )}
    </div>
  );
};

export default Chip;
