import { gridStore } from "../../state/zustand";
import { delay } from "../../utils/utils";

export const runDFS = async (speedRef) => {
  const { grid, start, end, setVisited, setPath } = gridStore.getState();

  if (!start || !end) {
    alert("Please set both Start and End points before running DFS");
    return;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = [];
  const parent = {};

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let found = false;

  const dfs = async (r, c) => {
    if (found) return;
    if (r === end[0] && c === end[1]) {
      found = true;
      return;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        grid[nr][nc] === 0 &&
        !visited.some(([vr, vc]) => vr === nr && vc === nc)
      ) {
        visited.push([nr, nc]);
        parent[`${nr},${nc}`] = [r, c];
        setVisited([...visited]);
        await delay(speedRef.current);

        await dfs(nr, nc);
      }
    }
  };

  visited.push(start);
  setVisited([...visited]);
  await dfs(start[0], start[1]);

  if (found) {
    const path = [];
    let cur = end;
    while (cur) {
      path.push(cur);
      cur = parent[`${cur[0]},${cur[1]}`];
    }
    setPath(path.reverse());
  }
};
