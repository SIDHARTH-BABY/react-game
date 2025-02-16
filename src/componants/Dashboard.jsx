import React, { useState } from "react";
import Header from "./Header";
import GameBox from "./GameBox";
import ReactionTable from "./ReactionTable";

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");
  const [randomVal, setRandomVal] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [pause, setPause] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [userClickData, setUserClickData] = useState([]);
  const [appearTime, setAppearTime] = useState(null);

  // Track whether the user has recently pressed reset
  const [hasReset, setHasReset] = useState(false);

  // Utility: Generate a random number between 1 and 50
  function getRandomVal() {
    const val = Math.floor(Math.random() * 50) + 1;
    setRandomVal(val);
    setIsClicked(false);
    setAppearTime(Date.now());
  }

  // Start the recurring interval
  function start(timer) {
    const id = setInterval(() => {
      getRandomVal();
    }, timer);
    setIntervalId(id);
  }

  // Main button click handler
  const buttonHandle = (val) => {
    const timer = parseInt(userInput, 10) * 1000;

    if (val === "start") {
      // If reset was just pressed, require a new valid time
      if (hasReset) {
        if (!userInput || parseInt(userInput, 10) <= 0) {
          alert("Please enter a new valid time in seconds (greater than 0) after reset.");
          return;
        }
        // Once a new valid input is set, clear the reset state
        setHasReset(false);
      }

      // Validate input again for good measure
      if (!userInput || parseInt(userInput, 10) <= 0) {
        alert("Please enter a valid time in seconds (greater than 0).");
        return;
      }

      // Start the game
      getRandomVal();
      start(timer);

    } else if (val === "pause") {
      setPause((prev) => !prev);
      if (!pause) {
        // Pausing
        clearInterval(intervalId);
      } else {
        // Resuming
        start(timer);
      }

    } else if (val === "reset") {
      // Clear everything out and mark that a reset occurred
      clearInterval(intervalId);
      setUserInput("");
      setRandomVal(null);
      setUserClickData([]);
      setPause(false);
      setIsClicked(false);
      setHasReset(true);
    }
  };

  // Handle a click on the highlighted number
  const handleUserClicks = () => {
    const currentTime = Date.now();
    const reactionTime = appearTime ? currentTime - appearTime : 0;
    setIsClicked(true);
    setUserClickData((prev) => [
      ...prev,
      { clicks: prev.length + 1, reactionTime },
    ]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-purple-100 via-pink-50 to-orange-100 p-4">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Header / Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <Header
            userInput={userInput}
            setUserInput={(val) => {
              // If the user starts typing again after a reset, remove the reset flag
              setHasReset(false);
              setUserInput(val);
            }}
            buttonHandle={buttonHandle}
          />
        </div>

        {/* Game Box */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <GameBox
            randomVal={randomVal}
            handleUserClicks={handleUserClicks}
            isClicked={isClicked}
          />
        </div>

        {/* Reaction Time Table */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <ReactionTable userClickData={userClickData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
