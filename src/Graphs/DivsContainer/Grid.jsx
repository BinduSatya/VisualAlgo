import { useState } from "react";
import { gridStore } from "../../state/zustand.jsx";

const Grid = () => {
  const {
    rows,
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
      grid.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex ? (cell === 0 ? 1 : 0) : cell
        )
      )
    );
  };

  const isVisited = (r, c) => visited.some(([vr, vc]) => vr === r && vc === c);
  const isPath = (r, c) => path.some(([pr, pc]) => pr === r && pc === c);

  return (
    <div
      className="flex flex-col items-center justify-center"
      onMouseUp={() => setIsMouseDown(false)}
    >
      <div
        className="grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${cols}, 20px)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isStart =
              start && start[0] === rowIndex && start[1] === colIndex;
            const isEnd = end && end[0] === rowIndex && end[1] === colIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-5 h-5 border transition-colors duration-200
                  ${
                    isStart
                      ? "bg-green-500"
                      : isEnd
                      ? "bg-red-500"
                      : isPath(rowIndex, colIndex)
                      ? "bg-yellow-400"
                      : isVisited(rowIndex, colIndex)
                      ? "bg-blue-400"
                      : cell === 1
                      ? "bg-primary"
                      : "bg-base-100 hover:bg-secondary"
                  }`}
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
            );
          })
        )}
      </div>
    </div>
  );
};

export default Grid;
