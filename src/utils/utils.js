const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomArray = (
  setActive,
  count = 10,
  min = 50,
  max = 300
) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(getRandomNumber(min, max));
  }
  setActive({ keyIdx: -1, compareIdx: [], finalised: [] });
  return result;
};

export const delay = async (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });


