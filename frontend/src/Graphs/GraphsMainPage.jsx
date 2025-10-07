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
  const [clicked, setClicked] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [steps, setSteps] = useState([]);
  const [loadingDryRun, setLoadingDryRun] = useState(false);
  console.log("hello");

  const speedRef = useRef(speed);

  const handleRunDFS = async () => {
    setLoadingDryRun(true);
    if (!start || !end) {
      console.log("Please set start and end points");
      return;
    }
    await runDFS(grid, start, end, setGrid, speedRef);
    setLoadingDryRun(false);
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
    <div className="flex flex-col h-full w-full">
      <div className="flex min-h-screen w-full bg-gray-900 text-white transition-all duration-500 ease-in-out">
        <div className="flex flex-col items-center justify-start px-6 overflow-hidden transition-all duration-500 ease-in-out w-3/4 border-r border-accent">
          <div className="flex items-start justify-center w-full my-4">
            <Link to="/" className="text-accent font-medium hover:underline">
              ← Back
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-center flex-1">
              Graph Algorithms Visualization
            </h2>
          </div>

          <div className="flex gap-4 my-4">
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

          <div className="w-full h-full overflow-hidden">
            <Grid />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 bg-gray-800 border-l border-accent rounded-sm overflow-y-auto max-h-screen transition-all duration-500 ease-in-out w-1/4">
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-soft bg-green-500"
              onClick={() => {
                setMode("start");
                setVisited([]);
                setPath([]);
              }}
            >
              Set Start Point
            </button>
            <button
              className="btn btn-soft bg-red-700"
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
              className="btn btn-soft bg-primary"
              onClick={() => setMode("wall")}
            >
              Create Wall
            </button>
            <button
              className="btn btn-soft text-primary bg-white"
              onClick={randomizeWalls}
            >
              Random Walls
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-soft"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runDijkstra(start, end, speedRef, setCompleted);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              Dijkstra
            </button>
            <button
              className="btn btn-soft"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await handleRunDFS(speedRef, setCompleted);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              DFS
            </button>
            <button
              className="btn btn-soft"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runBFS(speedRef, setCompleted);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              BFS
            </button>
            <button
              className="btn btn-soft"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runAStar(speedRef, setCompleted);
                  setCompleted(true);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              A* Algorithm
            </button>
            <button
              className="btn btn-soft"
              onClick={async () => {
                if (start && end) {
                  setVisited([]);
                  setPath([]);
                  await runBidirectionalBFS(speedRef, setCompleted);
                } else {
                  setError("Please set both start and end points.");
                }
              }}
            >
              Bi-Direct BFS
            </button>
          </div>

          <div className="flex gap-3">
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

          <div className="flex flex-col gap-2 text-white select-none">
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

          <div className="flex gap-6 items-center">
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
      {completed && (
        <div className="flex h-screen w-full gap-4 mt-3">
          <DryRunContainer
            clicked={clicked}
            steps={path}
            loadingDryRun={loadingDryRun}
          />
          <QueryContainer clicked={clicked} iniArray={grid} />
          <CodeGenerationContainer clicked={clicked} />
        </div>
      )}
    </div>
  );
};

export default GraphsMainPage;
