import { delay } from "../../utils/utils";

export const QuickSort = async (
  array,
  setArray,
  setActive,
  setDisabled,
  speedRef,
  setClicked
) => {
  const finalised = [];

  const partition = async (low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setActive({
        keyIdx: high,
        compareIdx: [j, i >= low ? i : null].filter((idx) => idx !== null),
        finalised: [...finalised],
      });
      await delay(speedRef.current);

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        setArray([...array]);
        await delay(speedRef.current);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    finalised.push(i + 1);
    setActive({ keyIdx: null, compareIdx: [], finalised: [...finalised] });
    setArray([...array]);
    await delay(speedRef.current);

    return i + 1;
  };

  const quickSort = async (low, high) => {
    if (low == high) {
      finalised.push(low);
      setActive({ keyIdx: null, compareIdx: [], finalised: [...finalised] });
      return;
    }
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await quickSort(low, pivotIndex - 1);
      await quickSort(pivotIndex + 1, high);
    }
  };

  setDisabled(true);
  await quickSort(0, array.length - 1);
  setArray([...array]);
  setActive({ keyIdx: null, compareIdx: [], finalised: [...finalised] });
  setDisabled(false);
  setClicked(null);
  return array;
};
