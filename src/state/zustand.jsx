import { create } from "zustand";

export const wallStore = create((set) => ({
  createWall: false,
  setCreateWall: (val) => set({ createWall: val }),
}));

export const clearGridStore = create((set) => ({
  clearGrid: false,
  setClearGrid: (state) => set({ clearGrid: !state.clearGrid }),
}));

// export const eraseWallStore = create((set) => ({
//   eraseWall: false,
//   setEraseWall:
// }));

export const gridStore = create((set) => ({
  grid: Array.from({ length: 20 }, () => Array.from({ length: 40 }, () => 0)),
  visited: [],
  path: [],
  setGrid: (state) => set({ grid: state }),
  setVisited: (cells) => set({ visited: cells }),
  setPath: (cells) => set({ path: cells }),
}));
