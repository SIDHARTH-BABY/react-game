import React from "react";

const Header = ({ userInput, setUserInput, buttonHandle }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <label className="text-lg font-semibold">Enter Timer:</label>
        <input
          type="number"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter time in seconds"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => buttonHandle("start")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Start
        </button>
        <button
          onClick={() => buttonHandle("pause")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Pause
        </button>
        <button
          onClick={() => buttonHandle("reset")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Header;
