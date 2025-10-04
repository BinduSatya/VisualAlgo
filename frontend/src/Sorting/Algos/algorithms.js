import { InsertionSort } from "./InsertionSort.js";
import { MergeSort } from "./MergeSort.js";
import { QuickSort } from "./QuickSort.js";
import { BubbleSort } from "./BubbleSort.js";
import { SelectionSort } from "./SelectionSort.js";

export const algorithms = [
  {
    name: "InsertionSort",
    label: "Insertion Sort",
    func: InsertionSort,
  },
  {
    name: "MergeSort",
    label: "Merge Sort",
    func: MergeSort,
  },
  {
    name: "QuickSort",
    label: "Quick Sort",
    func: QuickSort,
  },
  {
    name: "BubbleSort",
    label: "Bubble Sort",
    func: BubbleSort,
  },
  {
    name: "SelectionSort",
    label: "Selection Sort",
    func: SelectionSort,
  },
];
