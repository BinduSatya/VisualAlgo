import { delay } from "../../utils/utils";

export const InsertionSort = async (
  array,
  setArray,
  setActive,
  setDisabled,
  speedRef,
  setClicked
) => {
  const n = array.length;
  const finalised = [];
  setDisabled(true);
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    setActive({ keyIdx: i, compareIdx: [j, j + 1], finalised: [] });
    await delay(speedRef.current);
    while (j >= 0 && array[j] > key) {
      setActive({ keyIdx: i, compareIdx: [j, j + 1], finalised: [] });
      array[j + 1] = array[j];
      setArray([...array]);
      await delay(speedRef.current);
      j--;
    }
    array[j + 1] = key;
    setArray([...array]);
    console.log("Array after inserting element at index", i, ":", array);
  }
  setDisabled(false);
  setActive({ keyIdx: -1, compareIdx: [], finalised: [] });

  for (let i = 0; i < n; i++) {
    finalised.push(i);
    setActive({
      keyIdx: null,
      compareIdx: [],
      finalised: [...finalised],
    });
    await delay(speedRef.current);
  }
  setClicked(null);
  return array;
};
