import React from "react";

const GameBox = ({ randomVal, handleUserClicks, isClicked }) => {
  // For a 50-value grid, let's display 10 columns x 5 rows:
  const values = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-bold text-gray-700 tracking-wide">
        Click the highlighted number as fast as you can!
      </h2>
      <div className="grid grid-cols-10 gap-3">
        {values.map((num, index) => {
          const isActive = index === randomVal;
          return (
            <button
              key={index}
              onClick={() => (isActive && !isClicked ? handleUserClicks() : null)}
              className={`w-12 h-12 flex items-center justify-center 
                rounded-full font-semibold text-white transition transform 
                ${
                  isActive
                    ? "bg-red-500 animate-pulse hover:bg-red-600 hover:scale-105"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameBox;
