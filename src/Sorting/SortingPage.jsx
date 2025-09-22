import { useEffect, useRef, useState } from "react";

import { algorithms } from "./Algos/algorithms.js";
import BarsContainer from "../Components/BarsContainer.jsx";
import { generateRandomArray } from "../utils/utils.js";

const SortingPage = () => {
  const [array, setArray] = useState([]);
  const [active, setActive] = useState({
    keyIdx: null,
    compareIdx: [],
    finalised: [],
  });

  const [disabled, setDisabled] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [count, setCount] = useState(10);
  const [clicked, setClicked] = useState(null);

  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    setArray(generateRandomArray(setActive, count));
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-500">
      <h1 className="text-white text-3xl font-bold mb-8">
        Sorting Algorithms Visualization
      </h1>

      <BarsContainer array={array} active={active} />

      <div className="flex items-center gap-6 mt-6">
        <button
          className="px-5 py-2 rounded-lg shadow-md transition-all duration-200 bg-emerald-500 hover:bg-emerald-600 font-semibold text-white hover:shadow-[0_0_10px_rgba(16,185,129,0.8)]"
          disabled={disabled}
          onClick={() => setArray(generateRandomArray(setActive, count))}
        >
          Generate Array
        </button>

        <label htmlFor="">
          <div className="flex flex-row justify-center items-center">
            <span> Speed :</span>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={speed}
              className="cursor-pointer"
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <span className="text-white">{speed} ms</span>
          </div>
        </label>

        <label htmlFor="">
          <div className="flex flex-row justify-center items-center">
            <span> Count: </span>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={count}
              className="cursor-pointer"
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <span className="text-white">{count}</span>
          </div>
        </label>
      </div>

      {/* Sorting buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {algorithms.map((algo) => (
          <button
            key={algo.name}
            className={`px-5 py-2 rounded-lg shadow-md transition-all duration-200 ${
              clicked === algo.name
                ? "bg-white text-blue-600 border-2 border-blue-600 shadow-lg scale-105"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={disabled}
            style={{ opacity: disabled ? 0.5 : 1 }}
            onClick={() => {
              setClicked(algo.name);
              algo.func(
                array,
                setArray,
                setActive,
                setDisabled,
                speedRef,
                setClicked
              );
            }}
          >
            {algo.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortingPage;
