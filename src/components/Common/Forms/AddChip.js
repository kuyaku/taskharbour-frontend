import ColorPallete from "../ColorPallete";
import { useState } from "react";
import Chip from "../../Kanban/Chip";

const AddChip = ({ handleChipChange, colors, addedChips }) => {
  const [selectedColor, setSelectedColor] = useState("#FFA500");
  const [label, setLabel] = useState("");
  const [error, setError] = useState(false);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleLabelChange = (e) => {
    e.preventDefault();
    setLabel(e.target.value);
    setError(false);
  };

  const handleChipAdd = (e) => {
    e.preventDefault();
    if (
      label === "" ||
      addedChips.find((item) => item.name.toLowerCase() === label.toLowerCase())
    ) {
      setError(true);
      return;
    }
    handleChipChange([
      ...addedChips,
      { name: label.toLowerCase(), color: selectedColor },
    ]);
    setLabel("");
  };
  const handleChipRemoval = (name, color) => {
    handleChipChange((addedChips) =>
      addedChips.filter(
        (item) => !(item.name === name.toLowerCase() && item.color === color)
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="font-bold">Add Labels:</h1>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {addedChips.map((item) => (
            <Chip
              key={item.name + item.color}
              name={item.name}
              color={item.color}
              addControl={true}
              handleChipRemoval={handleChipRemoval}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <input
            style={{ border: error ? "2px solid red" : "" }}
            onChange={handleLabelChange}
            placeholder="Label"
            className="p-1 w-full text-black outline-none rounded-sm px-2"
            value={label}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <ColorPallete
                colors={colors}
                selectedColor={selectedColor}
                handleSelectColor={handleSelectColor}
              />
            </div>
            <button onClick={handleChipAdd} className="border rounded-md px-2">
              Add label
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChip;
