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
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black">
      <h1 className="text-white text-3xl font-bold m-4">
        Sorting Algorithms Visualization
      </h1>

      <BarsContainer array={array} active={active} />

      <div className="flex items-center gap-6 mt-6">
        <button
          className="btn btn-neutral btn-outline btn btn-xs sm:btn-sm md:btn-md"
          disabled={disabled}
          onClick={() => setArray(generateRandomArray(setActive, count))}
        >
          Generate Array
        </button>

        <label htmlFor="">
          <div className="flex flex-row justify-center items-center gap-3 text-white">
            <span className="font-medium">Speed:</span>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-60 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 transform -rotate-180"
            />
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
              className="
      w-50 h-2 bg-gray-700 rounded-lg cursor-pointer
      accent-gray-900
    "
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <span className="text-white">{count}</span>
          </div>
        </label>
      </div>

      <div className="my-6 flex flex-wrap gap-3">
        {algorithms.map((algo) => (
          <button
            key={algo.name}
            className={`btn btn-soft  
              ${clicked === algo.name ? "btn-primary" : "btn btn-accent"} ${
              disabled
                ? clicked === algo.name
                  ? "btn-primary"
                  : "btn btn-disabled"
                : "btn-accent"
            }`}
            tabIndex="-1"
            role="button"
            aria-disabled="true"
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
