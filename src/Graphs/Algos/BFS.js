import { delay } from "../../utils/utils";
import { gridStore } from "../../state/zustand.jsx";

export const runBFS = async (speedRef) => {
  const { grid, start, end, setVisited, setPath } = gridStore.getState();

  if (!start || !end) {
    alert("Please set both Start and End points before running BFS");
    return;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = [];
  const parent = {};
  const queue = [];

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  visited.push(start);
  queue.push(start);

  let found = false;

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    if (r === end[0] && c === end[1]) {
      found = true;
      break;
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
        queue.push([nr, nc]);
        setVisited([...visited]);
        await delay(speedRef.current);
      }
    }
  }

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
