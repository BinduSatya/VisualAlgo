import { delay } from "../../utils/utils";

export const InsertionSort = async (
  array,
  setArray,
  setActive,
  setDisabled
) => {
  const n = array.length;
  const finalised = [];
  setDisabled(true);
  console.log("Array received for Insertion Sort:", array);
  for (let i = 1; i < n; i++) {
    console.log(array);
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      setActive({ keyIdx: i, compareIdx: [j], finalised: [] });
      array[j + 1] = array[j];
      await delay(500);
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
    await delay(100);
  }
  return array;
};
