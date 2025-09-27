import Grid from "./DivsContainer/Grid";
import { gridStore } from "../state/zustand.jsx";
import { runDijkstra } from "./Algos/DjiksthraAlgo";
import { useState } from "react";

const GraphsMainPage = () => {
  const { start, end, visited, path, setMode, clearGrid } = gridStore();

  const [speed, setSpeed] = useState(600);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black">
      <h1 className="text-white text-3xl font-bold m-4">
        Graph Algorithms Visualization
      </h1>

      <div className="flex h-full w-screen mx-10">
        <div className="w-3/4 flex justify-center ml-3 items-center border-r border-gray-700">
          <Grid />
        </div>

        <div className="w-1/4 flex flex-col justify-start items-center gap-3 p-4">
          <button className="btn btn-soft" onClick={() => setMode("wall")}>
            Create Wall
          </button>
          <button className="btn btn-soft" onClick={() => setMode("start")}>
            Set Start Point
          </button>
          <button className="btn btn-soft" onClick={() => setMode("end")}>
            Set End Point
          </button>

          <button
            className="btn btn-soft"
            onClick={async () => {
              if (start && end) {
                await runDijkstra(start, end, speed);
              } else {
                alert("Please set both start and end points.");
              }
            }}
          >
            Run Algorithm
          </button>

          <button className="btn btn-soft" onClick={clearGrid}>
            Clear Grid
          </button>

          <div className="flex flex-col gap-2 text-white select-none mt-4">
            <span className="font-medium">Delay: {1000 - (speed - 100)}ms</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={1000 - (speed - 100)}
              onChange={(e) => setSpeed(1100 - Number(e.target.value))}
              className="w-60 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <p className="text-white">Visited: {visited.length}</p>
          <p className="text-white">Path: {path.length}</p>
        </div>
      </div>
    </div>
  );
};

export default GraphsMainPage;
