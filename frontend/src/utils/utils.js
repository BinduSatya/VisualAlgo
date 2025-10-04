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

import { gridStore } from "../state/zustand";

export const randomizeWalls = () => {
  const { grid, setGrid, start, end } = gridStore.getState();

  const newGrid = grid.map((row, r) =>
    row.map((cell, c) => {
      // Keep start and end cells empty
      if (
        (start && start[0] === r && start[1] === c) ||
        (end && end[0] === r && end[1] === c)
      ) {
        return 0;
      }
      // Randomly make wall (say 30% chance)
      return Math.random() < 0.3 ? 1 : 0;
    })
  );

  setGrid(newGrid);
};

export const getTime = (time) => {
  const date = new Date(time);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
