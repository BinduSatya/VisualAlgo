import { useEffect, useState } from "react";
import { wallStore, gridStore } from "../../state/zustand.jsx";

const Grid = ({ clearGrid, setClearGrid }) => {
  const grid = gridStore((state) => state.grid);
  const setGrid = gridStore((state) => state.setGrid);
  const visited = gridStore((state) => state.visited);
  const path = gridStore((state) => state.path);

  const isVisited = (r, c) => visited.some(([vr, vc]) => vr === r && vc === c);
  const isPath = (r, c) => path.some(([pr, pc]) => pr === r && pc === c);

  const createWall = wallStore((state) => state.createWall);
  const setCreateWall = wallStore((state) => state.setCreateWall);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const toggleWall = (rowIndex, colIndex) => {
    setGrid(
      grid.map((row, r) =>
        row.map((cell, c) => (r === rowIndex && c === colIndex ? 1 : cell))
      )
    );
  };

  useEffect(() => {
    if (clearGrid) {
      setGrid(
        Array.from({ length: 20 }, () => Array.from({ length: 40 }, () => 0))
      );
      setClearGrid(false);
    }
  }, [clearGrid, setClearGrid]);
  return (
    <div
      className="flex flex-col items-center justify-center"
      onMouseUp={() => {
        setCreateWall(false);
        setIsMouseDown(false);
      }}
    >
      <div
        className="grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${grid[0].length}, 20px)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-5 h-5 border transition-colors duration-200
    ${
      cell === 1
        ? "bg-primary"
        : isPath(rowIndex, colIndex)
        ? "bg-warning"
        : isVisited(rowIndex, colIndex)
        ? "bg-accent"
        : "bg-base-100 hover:bg-secondary"
    }`}
              onMouseDown={() => {
                setCreateWall(true);
                setIsMouseDown(true);
                toggleWall(rowIndex, colIndex);
              }}
              onMouseEnter={() => {
                if (isMouseDown && createWall) toggleWall(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
