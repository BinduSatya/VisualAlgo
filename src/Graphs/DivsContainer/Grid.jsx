import { useState } from "react";

const Grid = () => {
  const rows = 20;
  const cols = 40;

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
  );

  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="grid gap-[1px]"
        style={{ gridTemplateColumns: `repeat(${cols}, 20px)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-5 h-5 border border-gray-300 transition-colors duration-200
              ${cell === 0 ? "bg-base-100 hover:bg-secondary" : "bg-primary"}`}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseEnter={() => {
                if (isMouseDown) {
                  setGrid((prevGrid) => {
                    const newGrid = prevGrid.map((r, rIdx) =>
                      rIdx === rowIndex
                        ? r.map((c, cIdx) => (cIdx === colIndex ? 1 : c))
                        : r
                    );
                    return newGrid;
                  });
                }
              }}
              onMouseUp={() => setIsMouseDown(false)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
