import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { algorithms } from "./Algos/algorithms.js";
import BarsContainer from "../Components/BarsContainer.jsx";
import { generateRandomArray } from "../utils/utils.js";
import { Simulator } from "./Explanations/explanation.js";
import SpeedController from "../Components/SpeedController.jsx";
import CountController from "../Components/CountController.jsx";
import QueryContainer from "../Components/QueryContainer.jsx";
import DryRunContainer from "../Components/DryRunContainer.jsx";
import CodeGenerationContainer from "../Components/CodeGenerationContainer.jsx";

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
  const [loadingDryRun, setLoadingDryRun] = useState(false);

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

  const handleGenerateArray = () => {
    const newArray = generateRandomArray(setActive, count);
    setArray(newArray);
    setIniArray([...newArray]);
    setCompleted(false);
    setSteps([]);
  };

  const handleAlgoClick = async (algo) => {
    if (disabled) return;
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
    setLoadingDryRun(true);
    const newSteps = await Simulator(algo.name, iniArray);
    setSteps(newSteps);
    setLoadingDryRun(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex min-h-screen w-full bg-gray-900 text-white transition-all duration-500 ease-in-out">
        <div className="flex flex-col items-center justify-start px-6 overflow-hidden transition-all duration-500 ease-in-out w-3/4">
          <div className="flex items-start justify-center w-full my-4">
            <Link to="/" className="text-accent font-medium hover:underline">
              ← Back
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-center flex-1">
              Sorting Algorithms Visualization
            </h2>
          </div>

          <div className="w-full h-full overflow-hidden">
            <BarsContainer array={array} active={active} clicked={clicked} />

            <div className="flex w-full px-20 py-10 gap-10">
              <SpeedController speed={speed} setSpeed={setSpeed} />
              <CountController
                count={count}
                disabled={disabled}
                setCount={setCount}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 bg-gray-800 border-l border-accent rounded-sm overflow-y-auto max-h-screen transition-all duration-500 ease-in-out w-1/4">
          <button
            className={`btn px-6 py-2 rounded-lg shadow-md transition ${
              disabled ? "btn-disabled" : "btn-secondary"
            }`}
            disabled={disabled}
            onClick={handleGenerateArray}
          >
            Generate Array
          </button>

          <div className="flex flex-wrap gap-2 max-h-full w-full justify-center">
            {algorithms.map((algo) => (
              <button
                key={algo.name}
                className={`btn px-4 py-2 rounded transition ${
                  disabled
                    ? clicked === algo.name
                      ? "btn-primary"
                      : "btn-disabled"
                    : "btn-accent hover:btn-primary"
                }`}
                onClick={() => {
                  setSteps([]);
                  handleAlgoClick(algo);
                }}
              >
                {algo.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {completed && (
        <div className="flex h-screen w-full gap-4 mt-3">
          <DryRunContainer
            clicked={clicked}
            steps={steps}
            loadingDryRun={loadingDryRun}
          />
          <QueryContainer clicked={clicked} iniArray={iniArray} />
          <CodeGenerationContainer clicked={clicked} />
        </div>
      )}
    </div>
  );
};

export default SortingPage;
