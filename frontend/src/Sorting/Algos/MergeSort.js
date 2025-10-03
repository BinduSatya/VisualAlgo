import { delay } from "../../utils/utils";

export const MergeSort = async (
  array,
  setArray,
  setActive,
  setDisabled,
  speedRef,
  setClicked,
  setCompleted
) => {
  if (array.length <= 1) return array;
  setDisabled(true);

  const merge = async (left, right, startIdx, mergedIndices) => {
    let merged = [];
    let i = 0,
      j = 0;
    setActive({
      keyIdx: null,
      compareIdx: [],
      finalised: mergedIndices,
    });

    await delay(speedRef.current);

    while (i < left.length && j < right.length) {
      setActive({
        keyIdx: null,
        compareIdx: [startIdx + i, startIdx + left.length + j],
        finalised: mergedIndices,
      });
      await delay(speedRef.current);

      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }

      setArray([
        ...array.slice(0, startIdx),
        ...merged,
        ...left.slice(i),
        ...right.slice(j),
        ...array.slice(startIdx + left.length + right.length),
      ]);
      await delay(speedRef.current);
    }

    while (i < left.length) {
      merged.push(left[i++]);
      setArray([
        ...array.slice(0, startIdx),
        ...merged,
        ...left.slice(i),
        ...right.slice(j),
        ...array.slice(startIdx + left.length + right.length),
      ]);
      await delay(speedRef.current);
    }
    while (j < right.length) {
      merged.push(right[j++]);
      setArray([
        ...array.slice(0, startIdx),
        ...merged,
        ...left.slice(i),
        ...right.slice(j),
        ...array.slice(startIdx + left.length + right.length),
      ]);
      await delay(speedRef.current);
    }

    setActive({
      keyIdx: null,
      compareIdx: [],
      finalised: [
        ...mergedIndices,
        ...Array.from({ length: merged.length }, (_, idx) => startIdx + idx),
      ],
    });
    await delay(speedRef.current);

    return merged;
  };

  const mergeSort = async (arr, startIdx = 0, mergedIndices = []) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const left = await mergeSort(arr.slice(0, mid), startIdx, mergedIndices);
    const right = await mergeSort(
      arr.slice(mid),
      startIdx + mid,
      mergedIndices
    );

    const merged = await merge(left, right, startIdx, mergedIndices);

    for (let k = 0; k < merged.length; k++) {
      array[startIdx + k] = merged[k];
    }
    setArray([...array]);
    return merged;
  };

  await mergeSort(array);

  const finalised = [];
  for (let i = 0; i < array.length; i++) {
    finalised.push(i);
    setActive({
      keyIdx: null,
      compareIdx: [],
      finalised: [...finalised],
    });
    await delay(speedRef.current);
  }

  setDisabled(false);
  setActive({ keyIdx: null, compareIdx: [], finalised: [] });
  // setClicked(null);
  setCompleted(true);
  return array;
};
