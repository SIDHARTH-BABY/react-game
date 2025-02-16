import React, { useEffect } from "react";

const ReactionTable = ({ userClickData }) => {
  useEffect(() => {
    console.log(userClickData, "coming in the reaction table");
  }, [userClickData]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700 tracking-wide">
        Your Reaction Times
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-blue-500 text-white text-base font-semibold">
              <th className="px-6 py-3">Click Count</th>
              <th className="px-6 py-3">Reaction Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            {userClickData?.length > 0 ? (
              userClickData.map((val, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  } hover:bg-blue-100 transition`}
                >
                  <td className="px-6 py-3 text-center text-gray-800 font-medium">
                    {val.clicks}
                  </td>
                  <td className="px-6 py-3 text-center text-gray-800 font-medium">
                    {val.reactionTime} ms
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReactionTable;
