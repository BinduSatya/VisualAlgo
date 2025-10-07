import { create } from "zustand";

export const gridStore = create((set) => ({
  rows: 20,
  cols: 40,
  grid: Array.from({ length: 20 }, () => Array.from({ length: 40 }, () => 0)),
  start: null,
  end: null,
  visited: [],
  path: [],
  mode: "wall",
  running: false,

  setGrid: (newGrid) => set({ grid: newGrid }),
  setStart: (pos) => set({ start: pos }),
  setEnd: (pos) => set({ end: pos }),
  setVisited: (visited) => set({ visited }),
  setPath: (path) => set({ path }),
  setMode: (mode) => set({ mode }),
  setRunning: (running) => set({ running }),

  clearGrid: () =>
    set({
      grid: Array.from({ length: 20 }, () =>
        Array.from({ length: 40 }, () => 0)
      ),
      start: null,
      end: null,
      visited: [],
      path: [],
      mode: "wall",
      running: false,
    }),
}));



export const wallStore = create((set) => ({
  createWall: false,
  setCreateWall: (val) => set({ createWall: val }),
}));
