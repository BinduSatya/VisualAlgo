import { delay } from "../../utils/utils";

export const SelectionSort = async (
  array,
  setArray,
  setActive,
  setDisabled,
  speedRef
) => {
  const n = array.length;
  const finalised = [];
  setDisabled(true);

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
      setArray([...array]);
      setActive({
        keyIdx: minIdx,
        compareIdx: [j],
        finalised: [...finalised],
      });
      await delay(speedRef.current);
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    finalised.push(i);
    setArray([...array]);
    setActive({
      keyIdx: -1,
      compareIdx: [],
      finalised: [...finalised],
    });
  }
  finalised.push(n - 1);
  setActive({
    keyIdx: -1,
    compareIdx: [],
    finalised: [...finalised],
  });
  setDisabled(false);
  setArray([...array]);
  return array;
};
