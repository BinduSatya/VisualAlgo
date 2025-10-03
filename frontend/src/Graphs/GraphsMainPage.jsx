import Grid from "../Components/Grid.jsx";
import { gridStore } from "../state/zustand.jsx";
import { runDijkstra } from "./Algos/DjiksthraAlgo.js";
import { useEffect, useRef, useState } from "react";
import { runDFS } from "./Algos/DFS.js";
import { runBFS } from "./Algos/BFS.js";
import { runAStar } from "./Algos/AStar.js";
import { runBidirectionalBFS } from "./Algos/BiDirectionalBFS.js";
import { randomizeWalls } from "../utils/utils.js";
import { Link } from "react-router-dom";

const GraphsMainPage = () => {
  const {
    start,
    end,
    visited,
    grid,
    setGrid,
    path,
    setMode,
    clearGrid,
    setVisited,
    setPath,
  } = gridStore();

  const [speed, setSpeed] = useState(600);
  const [error, setError] = useState(false);

  const speedRef = useRef(speed);

  const handleRunDFS = async () => {
    if (!start || !end) {
      console.log("Please set start and end points");
      return;
    }
    await runDFS(grid, start, end, setGrid, speedRef);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black">
      <div className="flex h-full w-screen mx-10">
        <div className="position-absolute">
          <Link to={"/"} className="text-white font-medium hover:underline ">
            Back
          </Link>
        </div>
        <div className="w-3/4 flex justify-center ml-3 items-center border-r border-gray-700">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-full px-4 mt-4">
              <h1 className="text-white text-3xl font-bold m-4">
                Graph Algorithms Visualization
              </h1>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-primary rounded-md"></div>
                <span className="text-white text-sm">Wall</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-green-500 rounded-md"></div>
                <span className="text-white text-sm">Start</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-red-500 rounded-md"></div>
                <span className="text-white text-sm">End</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-400 rounded-md"></div>
                <span className="text-white text-sm">Visited</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-yellow-400 rounded-md"></div>
                <span className="text-white text-sm">Path</span>
              </div>
            </div>
            <Grid />
          </div>
        </div>

        <div className="w-1/4 flex flex-col justify-start items-center gap-3 p-4">
          <div className="flex flex-wrap">
            <button
              className="btn btn-soft mr-4 bg-green-500 mt-2"
              onClick={() => {
                setMode("start");
                setVisited([]);
                setPath([]);
              }}
            >
              Set Start Point
            </button>
            <button
              className="btn btn-soft mr-4 bg-red-700 mt-2"
              onClick={() => {
                if (start) {
                  setVisited([]);
                  setPath([]);
                  setMode("end");
                } else {
                  setError("Please set start point.");
                }
              }}
            >
              Set End Point
            </button>

            <button
              className="btn btn-soft mr-4 bg-primary mt-2"
              onClick={() => setMode("wall")}
            >
              Create Wall
            </button>
            <button
              className="btn btn-soft text-primary bg-white mt-2 mr-4"
              onClick={randomizeWalls}
            >
              Random Walls
            </button>
          </div>
          <div className="flex flex-wrap ">
            <button
              className="btn btn-soft ml-4 mt-4"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runDijkstra(start, end, speedRef);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              Djiksthra
            </button>
            <button
              className="btn btn-soft ml-4 mt-4"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await handleRunDFS(speedRef);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              DFS
            </button>
            <button
              className="btn btn-soft ml-4 mt-4"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runBFS(speedRef);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              BFS
            </button>
            <button
              className="btn btn-soft ml-4 mt-4"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runAStar(speedRef);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              A* Algorithm
            </button>
            <button
              className="btn btn-soft ml-4 mt-4"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runBidirectionalBFS(speedRef);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              Bi-Direct-BFS
            </button>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="btn btn-soft bg-info" onClick={clearGrid}>
              Clear Grid
            </button>
            <button
              className="btn btn-error"
              onClick={() => gridStore.getState().setRunning(false)}
            >
              Stop Algorithm
            </button>
          </div>

          <div className="flex flex-col gap-2 text-white select-none mt-4">
            <span className="font-medium">Speed: {1000 - (speed - 100)}</span>
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
          <div className="flex gap-6 items-center mt-4">
            <p className="text-blue-400 font-semibold">
              Visited: <span className="text-white">{visited.length}</span>
            </p>
            <p className="text-yellow-400 font-semibold">
              Path: <span className="text-white">{path.length}</span>
            </p>
          </div>

          {error && (
            <div className="toast toast-bottom toast-center">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphsMainPage;
