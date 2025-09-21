import { useEffect, useRef, useState } from "react";
import { InsertionSort } from "./Algos/InsertionSort.js";
import { MergeSort } from "./Algos/MergeSort.js";
import { QuickSort } from "./Algos/QuickSort.js";
import { BubbleSort } from "./Algos/BubbleSort.js";
import { SelectionSort } from "./Algos/SelectionSort.js";
import BarsContainer from "../Components/BarsContainer";
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
  const speedRef = useRef(speed);

  // keep ref updated with latest speed
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // generate initial array
  useEffect(() => {
    setArray(generateRandomArray(setActive));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-500">
      <h1 className="text-white text-3xl font-bold mb-8">
        Sorting Algorithms Visualization
      </h1>

      <BarsContainer array={array} active={active} />

      {/* Controls */}
      <div className="flex items-center gap-6 mt-6">
        <button
          className="px-14 py-2 bg-green-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() => setArray(generateRandomArray(setActive))}
        >
          Generate Array
        </button>

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

      {/* Sorting buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() =>
            InsertionSort(array, setArray, setActive, setDisabled, speedRef)
          }
        >
          Insertion Sort
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() =>
            MergeSort(array, setArray, setActive, setDisabled, speedRef)
          }
        >
          Merge Sort
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() =>
            QuickSort(array, setArray, setActive, setDisabled, speedRef)
          }
        >
          Quick Sort
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() =>
            BubbleSort(array, setArray, setActive, setDisabled, speedRef)
          }
        >
          Bubble Sort
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() =>
            SelectionSort(array, setArray, setActive, setDisabled, speedRef)
          }
        >
          Selection Sort
        </button>
      </div>
    </div>
  );
};

export default SortingPage;
