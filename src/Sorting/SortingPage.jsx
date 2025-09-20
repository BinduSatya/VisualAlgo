import { useEffect, useState } from "react";
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

  useEffect(() => {
    setArray(generateRandomArray(setActive));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-500">
      <h1 className="text-white text-3xl font-bold mb-8">
        Sorting Algorithms Visualization
      </h1>
      <BarsContainer array={array} active={active} />
      <button
        className="mt-4 px-14 py-2 bg-green-500 text-white rounded cursor-pointer"
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
        onClick={() => {
          setArray(generateRandomArray(setActive));
        }}
      >
        Generate Array
      </button>
      <div className="mt-4">
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() => {
            setDisabled(true);
            InsertionSort(array, setArray, setActive, setDisabled);
            setArray([...array]);
          }}
        >
          Insertion Sort
        </button>
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={(array) => {
            setDisabled(true);
            MergeSort(array, setArray, active, setActive, setDisabled);
            setArray([...array]);
          }}
        >
          Merge Sort
        </button>
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={() => {
            setDisabled(true);
            QuickSort(array, setArray, setActive, setDisabled);
            setArray([...array]);
          }}
        >
          Quick Sort
        </button>
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={(array) => {
            setDisabled(true);
            BubbleSort(array, setArray, setActive, setDisabled);
            setArray([...array]);
          }}
        >
          Bubble Sort
        </button>
        <button
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
          onClick={(array) => {
            setDisabled(true);
            SelectionSort(array, setArray, setActive, setDisabled);
            setArray([...array]);
          }}
        >
          Selection Sort
        </button>
      </div>
    </div>
  );
};

export default SortingPage;
