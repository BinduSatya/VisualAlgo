import { useState } from "react";
import { gridStore } from "../state/zustand";

const Grid = () => {
  const {
    cols,
    grid,
    setGrid,
    start,
    end,
    setStart,
    setEnd,
    visited,
    path,
    mode,
  } = gridStore();

  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleWall = (rowIndex, colIndex) => {
    setGrid(
      grid.map((rows, r) =>
        rows.map((cell, c) =>
          r === rowIndex && c === colIndex ? (cell === 0 ? 1 : 0) : cell
        )
      )
    );
  };

  const isVisited = (r, c) => visited.some(([vr, vc]) => vr === r && vc === c);
  const isPath = (r, c) => path.some(([pr, pc]) => pr === r && pc === c);

  const getCellClass = (rowIndex, colIndex, cell) => {
    const isStart = start && start[0] === rowIndex && start[1] === colIndex;
    const isEnd = end && end[0] === rowIndex && end[1] === colIndex;

    if (isStart) return "bg-green-600 hover:bg-green-400 border border-white";
    if (isEnd) return "bg-red-600 hover:bg-red-400 border border-white";
    if (isPath(rowIndex, colIndex))
      return "bg-yellow-400 hover:bg-yellow-300 border border-white";
    if (isVisited(rowIndex, colIndex))
      return "bg-blue-400 hover:bg-blue-300 border border-white";
    if (cell === 1) return "bg-primary border border-white";

    if (mode === "wall") return "bg-black hover:bg-primary border border-white";
    if (mode === "start")
      return "bg-black hover:bg-green-400 border border-white";
    if (mode === "end") return "bg-black hover:bg-red-400 border border-white";

    return "bg-black border border-white";
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      onMouseUp={() => setIsMouseDown(false)}
    >
      <div
        className="grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${cols}, 20px)` }}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-5 h-5 border rounded-xs transition-colors duration-200 ${getCellClass(
                rowIndex,
                colIndex,
                cell
              )}`}
              onMouseDown={() => {
                setIsMouseDown(true);
                if (mode === "wall") toggleWall(rowIndex, colIndex);
                else if (mode === "start") setStart([rowIndex, colIndex]);
                else if (mode === "end") setEnd([rowIndex, colIndex]);
              }}
              onMouseEnter={() => {
                if (isMouseDown && mode === "wall")
                  toggleWall(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
