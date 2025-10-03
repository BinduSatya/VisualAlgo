import { InsertionSort } from "./InsertionSort.js";
import { MergeSort } from "./MergeSort.js";
import { QuickSort } from "./QuickSort.js";
import { BubbleSort } from "./BubbleSort.js";
import { SelectionSort } from "./SelectionSort.js";

export const algorithms = [
  {
    name: "Insertion",
    label: "Insertion Sort",
    func: InsertionSort,
  },
  {
    name: "Merge",
    label: "Merge Sort",
    func: MergeSort,
  },
  {
    name: "Quick",
    label: "Quick Sort",
    func: QuickSort,
  },
  {
    name: "Bubble",
    label: "Bubble Sort",
    func: BubbleSort,
  },
  {
    name: "Selection",
    label: "Selection Sort",
    func: SelectionSort,
  },
];
