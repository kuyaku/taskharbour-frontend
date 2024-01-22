import { useState } from "react";

const ColorPallete = ({ colors, selectedColor, handleSelectColor }) => {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      {colors.map((item) => (
        <div
          onClick={() => handleSelectColor(item)}
          key={item}
          style={{
            backgroundColor: item,
            width: item === selectedColor ? "25px" : "20px",
            height: item === selectedColor ? "25px" : "20px",
          }}
          className="rounded-[50%]"
        ></div>
      ))}
    </div>
  );
};

export default ColorPallete;
