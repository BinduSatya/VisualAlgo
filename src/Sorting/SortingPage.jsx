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
    <div className="flex flex-col items-center justify-center h-full w-full bg-black">
      <h1 className="text-white text-3xl font-bold m-4">
        Sorting Algorithms Visualization
      </h1>

      <BarsContainer array={array} active={active} clicked={clicked} />

      <div className="flex items-center gap-6 mt-6">
        <button
          className={`btn btn-accent btn-outline btn btn-xs sm:btn-sm md:btn-md border-2 ${
            disabled ? "border-primary" : "border-accent"
          }`}
          tabIndex="-1"
          role="button"
          aria-disabled="true"
          disabled={disabled}
          onClick={() => setArray(generateRandomArray(setActive, count))}
        >
          Generate Array
        </button>

        <div className="flex flex-row justify-center items-center gap-3 text-white select-none">
          <span className="font-medium">Speed:</span>

          <div>
            <input
              type="range"
              min="1"
              max="101"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className={`w-60 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${
                disabled ? "accent-primary" : "accent-accent"
              } transform -rotate-180`}
            />
            <div className="flex justify-between pl-2.5 mt-2 text-xs ">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between pl-2.5 mt-2 text-xs ">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-3 text-white">
          <span className="font-medium select-none"> Count:</span>
          <div>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={count}
              disabled={disabled}
              className={`w-60 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${
                disabled ? "accent-accent" : "accent-primary"
              }`}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <div className="flex justify-between pl-2.5 mt-2 text-xs select-none">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between pl-2.5 mt-2 text-xs select-none">
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
              <span>50</span>
              <span>60</span>
              <span>70</span>
              <span>80</span>
              <span>90</span>
              <span>100</span>
            </div>
          </div>
          <span className="pl-5 text-white">
            <input
              type="number"
              name="count"
              id="count"
              className="input input-neutral w-15"
              min={5}
              disabled={disabled}
              max={100}
              value={count}
              onChange={(e) => {
                if (Number(e.target.value) < 3) {
                  setCount(3);
                } else if (Number(e.target.value) > 100) {
                  setCount(100);
                } else setCount(Number(e.target.value));
              }}
            />
          </span>
        </div>
      </div>

      <div className="my-6 flex flex-wrap gap-3">
        {algorithms.map((algo) => (
          <button
            key={algo.name}
            tabIndex="-1"
            role="button"
            aria-disabled="true"
            className={`btn btn-soft 
              ${
                disabled
                  ? clicked === algo.name
                    ? "btn-primary"
                    : "btn-disabled"
                  : "btn-accent"
              }`}
            onClick={() => {
              disabled === true
                ? null
                : (setClicked(algo.name),
                  algo.func(
                    array,
                    setArray,
                    setActive,
                    setDisabled,
                    speedRef,
                    setClicked
                  ));
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
