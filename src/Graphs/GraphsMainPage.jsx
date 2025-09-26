import Grid from "./DivsContainer/Grid";
import { gridStore, wallStore } from "../state/zustand";
import { runDijkstra } from "./Algos/DjiksthraAlgo";
import { useState } from "react";

const GraphsMainPage = () => {
  const createWall = wallStore((state) => state.createWall);
  const setCreateWall = wallStore((state) => state.setCreateWall);
  const visited = gridStore((state) => state.visited);
  const path = gridStore((state) => state.path);

  const [clearGrid, setClearGrid] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black">
      <h1 className="text-white text-3xl font-bold m-4">
        Graph Algorithms Visualization
      </h1>

      <div className="flex h-full w-screen mx-10">
        <div className="w-3/4 flex justify-center ml-3 items-center border-r border-gray-700">
          <Grid clearGrid={clearGrid} setClearGrid={setClearGrid} />
        </div>

        <div className="w-1/4 flex flex-col justify-start items-center gap-3 p-4">
          <button
            className="btn btn-soft"
            onClick={() => setCreateWall(!createWall)}
          >
            {createWall ? "Stop Creating Walls" : "Create Wall"}
          </button>
          <button className="btn btn-soft" onClick={() => {}}>
            Create Start Point
          </button>
          <button className="btn btn-soft" onClick={() => {}}>
            Create End Point
          </button>

          <button
            className="btn btn-soft"
            onClick={async () => await runDijkstra([0, 0], [5, 5], speed)}
          >
            Run Algorithm
          </button>
          <button className="btn btn-soft" onClick={() => setClearGrid(true)}>
            Clear Grid
          </button>
          <div className="flex flex-row justify-center items-center gap-3 text-white select-none">
            <span className="font-medium">Speed:</span>

            <div>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={(e) => {
                  console.log(e);
                  setSpeed(Number(e.target.value));
                }}
                className={`w-60 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${
                  disabled ? "accent-primary" : "accent-accent"
                } transform -rotate-180`}
              />
              <div className="flex justify-between pl-2.5 mt-2 text-xs ">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
              <div className="flex justify-between pl-2.5 mt-2 text-xs ">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
          </div>
          <p className="text-white">Visited: {visited.length}</p>
          <p className="text-white">Path: {path.length}</p>
        </div>
      </div>
    </div>
  );
};

export default GraphsMainPage;
