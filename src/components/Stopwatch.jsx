import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="max-w-sm mx-auto text-center p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-4">Stopwatch</h1>
      <div className="mb-6">
        <h2 className="text-5xl font-mono text-gray-800">{formatTime(time)}</h2>
      </div>
      <div className="space-x-4 mb-6">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
        >
          Reset
        </button>
        <button
          onClick={addLap}
          disabled={!isRunning}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none disabled:bg-gray-400"
        >
          Lap
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Lap Times</h3>
        <ul className="list-none p-0">
          {laps.map((lap, index) => (
            <li key={index} className="text-lg text-gray-700 mb-2">
              {`Lap ${index + 1}: ${formatTime(lap)}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
