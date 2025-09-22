import { delay } from "../../utils/utils";

export const BubbleSort = async (
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

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      setArray([...array]);
      setActive({
        keyIdx: null,
        compareIdx: [j, j + 1],
        finalised: [...finalised],
      });
      await delay(speedRef.current);
    }
    finalised.push(n - i - 1);
    setActive({ keyIdx: null, compareIdx: [], finalised: [...finalised] });
    setArray([...array]);
    await delay(speedRef.current);
  }
  finalised.push(0);
  setDisabled(false);
  setActive({ keyIdx: -1, compareIdx: [], finalised: [...finalised] });
  setArray([...array]);
  setClicked(null);
  return array;
};
