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

  function getRandomVal() {
    let val = Math.floor(Math.random() * 50) + 1;
    setRandomVal(val);
    setIsClicked(false);
    setAppearTime(Date.now());
  }

  function start(timer) {
    let id = setInterval(() => {
      getRandomVal();
    }, timer);
    setIntervalId(id);
  }

  const buttonHandle = (val) => {
    let timer = userInput * 1000;

    if (val === "start") {
      getRandomVal();
      start(timer);
    } else if (val === "pause") {
      setPause((prev) => !prev);
      if (!pause) {
        clearInterval(intervalId);
      } else {
        start(timer);
      }
    } else if (val === "reset") {
      clearInterval(intervalId);
      setUserInput("");
      setRandomVal(null);
      setUserClickData([]);
    }
  };

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
            setUserInput={setUserInput}
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
