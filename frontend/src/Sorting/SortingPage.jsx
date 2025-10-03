import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { algorithms } from "./Algos/algorithms.js";
import BarsContainer from "../Components/BarsContainer.jsx";
import { generateRandomArray } from "../utils/utils.js";
import { Simulator } from "./Explanations/explanation.jsx";

const SortingPage = () => {
  const [array, setArray] = useState([]);
  const [iniArray, setIniArray] = useState([]);
  const [active, setActive] = useState({
    keyIdx: null,
    compareIdx: [],
    finalised: [],
  });
  const [disabled, setDisabled] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [count, setCount] = useState(10);
  const [clicked, setClicked] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [steps, setSteps] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const newArray = generateRandomArray(setActive, count);
    setArray(newArray);
    setIniArray([...newArray]);
    setCompleted(false);
    setSteps([]);
  }, [count]);

  return (
    <div className="flex min-h-screen w-full bg-gray-900 text-white transition-all duration-500 ease-in-out">
      <div
        className={`flex flex-col items-center justify-start px-6 overflow-hidden 
          transition-all duration-500 ease-in-out 
          ${steps.length > 0 ? "w-1/2" : "w-3/4"}`}
      >
        <div className="flex items-start justify-center w-full my-4">
          <Link to="/" className="text-accent font-medium hover:underline">
            ← Back
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-center flex-1">
            Sorting Algorithms Visualization
          </h2>
        </div>

        <div className="w-full h-full overflow-hidden">
          <div className="flex flex-col gap-3 items-center justify-center">
            <BarsContainer array={array} active={active} clicked={clicked} />
          </div>

          <div className="flex w-full px-20 py-10 gap-10">
            {/* Speed Control */}
            <div className="flex flex-row gap-5 w-9/20">
              <span className="font-medium mb-2">Speed</span>
              <div className="flex flex-col w-full">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={11 - Math.floor(speed / 100)}
                  onChange={(e) =>
                    setSpeed((11 - Number(e.target.value)) * 100)
                  }
                  className="range range-accent w-full"
                />
                <div className="flex justify-between w-full text-xs mt-1">
                  {[...Array(10)].map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Count Control */}
            <div className="flex flex-row gap-5 items-center w-11/20">
              <span className="font-medium ">Count</span>
              <div className="flex flex-col w-full">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  disabled={disabled}
                  className="range range-primary w-full"
                />
                <div className="flex justify-between w-full text-xs mt-1">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => (
                    <span key={val}>{val}</span>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min={3}
                max={100}
                value={count}
                disabled={disabled}
                className="input input-bordered w-20 text-white"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < 3) setCount(3);
                  else if (val > 100) setCount(100);
                  else setCount(val);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-6 p-6 bg-gray-800 border-l border-accent rounded-sm overflow-y-auto max-h-screen 
          transition-all duration-500 ease-in-out
          ${steps.length > 0 ? "w-1/2" : "w-1/4"}`}
      >
        <button
          className={`btn px-6 py-2 rounded-lg shadow-md transition ${
            disabled ? "btn-disabled" : "btn-secondary"
          }`}
          disabled={disabled}
          onClick={() => {
            const newArray = generateRandomArray(setActive, count);
            setArray(newArray);
            setIniArray([...newArray]);
            setCompleted(false);
            setSteps([]);
          }}
        >
          Generate Array
        </button>

        <div className="flex flex-wrap gap-2 max-h-full w-full justify-center">
          {algorithms.map((algo) => (
            <button
              key={algo.name}
              className={`btn px-4 py-2 rounded transition 
                ${
                  disabled
                    ? clicked === algo.name
                      ? "btn-primary"
                      : "btn-disabled"
                    : "btn-accent hover:btn-primary"
                }`}
              onClick={() => {
                if (!disabled) {
                  setClicked(algo.name);
                  algo.func(
                    array,
                    setArray,
                    setActive,
                    setDisabled,
                    speedRef,
                    setClicked,
                    setCompleted
                  );
                }
              }}
            >
              {algo.label}
            </button>
          ))}
        </div>

        {completed && (
          <div className="w-full bg-gray-800 rounded-xl p-4 shadow-lg mt-6 border border-gray-600">
            <h2 className="text-xl font-bold mb-4 text-accent border-b border-gray-600 pb-2">
              Dry-Run Simulation: <span className="text-white">{clicked}</span>
            </h2>

            <button
              onClick={async () => {
                setLoadingResponse(true);
                await Simulator(clicked, iniArray, setSteps);
                setLoadingResponse(false);
              }}
              disabled={loadingResponse}
              hidden={steps.length > 0}
              className="btn btn-secondary w-full mb-4 text-white font-medium hover:bg-accent transition-colors duration-300"
            >
              {loadingResponse ? "Loading..." : "Dry-Run"}
            </button>

            <div
              className={`overflow-y-auto text-wrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${
                steps.length > 0 ? "p-3" : ""
              } bg-gray-900 rounded-md`}
            >
              <ul className="list-decimal list-inside space-y-2">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="text-gray-200 hover:text-accent transition-colors cursor-pointer duration-200"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingPage;
