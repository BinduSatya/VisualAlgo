import { delay } from "../../utils/utils";

export const InsertionSort = async (
  array,
  setArray,
  setActive,
  setDisabled,
  speedRef,
  setClicked,
  setCompleted
) => {
  const n = array.length;
  const finalised = [];

  setDisabled(true);

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Show the key separately
    setActive({
      keyIdx: i,
      compareIdx: [j],
      finalised: [...finalised],
    });
    await delay(speedRef.current);

    // Temporarily remove the key (so it doesn't vanish when shifting)
    const tempArray = [...array];
    tempArray[i] = null; // placeholder for "floating" key
    setArray(tempArray);

    while (j >= 0 && array[j] > key) {
      // Highlight comparison
      setActive({
        keyIdx: i,
        compareIdx: [j],
        finalised: [...finalised],
      });
      await delay(speedRef.current);

      // Shift element right
      array[j + 1] = array[j];
      setArray([...array]);
      await delay(speedRef.current);

      j--;
    }

    // Insert key into its correct place
    array[j + 1] = key;
    setArray([...array]);

    setActive({
      keyIdx: j + 1,
      compareIdx: [],
      finalised: [...finalised],
    });
    await delay(speedRef.current);
  }

  // Finalise gradually
  for (let i = 0; i < n; i++) {
    finalised.push(i);
    setActive({
      keyIdx: null,
      compareIdx: [],
      finalised: [...finalised],
    });
    await delay(speedRef.current);
  }

  setActive({ keyIdx: null, compareIdx: [], finalised: [...finalised] });
  setDisabled(false);
  setCompleted(true);

  return array;
};
