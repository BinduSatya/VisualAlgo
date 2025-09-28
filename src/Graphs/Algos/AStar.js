import { gridStore } from "../../state/zustand.jsx";
import { delay } from "../../utils/utils";

const heuristic = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

export const runAStar = async (speedRef) => {
  const { grid, start, end, setVisited, setPath, setRunning } =
    gridStore.getState();

  setRunning(true);
  const rows = grid.length;
  const cols = grid[0].length;

  const openSet = [];
  const visited = [];
  const parent = {};

  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

  gScore[start[0]][start[1]] = 0;
  fScore[start[0]][start[1]] = heuristic(start, end);

  openSet.push([start[0], start[1], fScore[start[0]][start[1]]]);

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (openSet.length > 0) {
    if (!gridStore.getState().running) {
      console.log("Algorithm stopped!");
      return;
    }
    openSet.sort((a, b) => a[2] - b[2]);
    const [r, c] = openSet.shift();

    if (r === end[0] && c === end[1]) {
      const path = [];
      let cur = end;
      while (cur) {
        path.push(cur);
        cur = parent[`${cur[0]},${cur[1]}`];
      }
      setPath(path.reverse());
      return;
    }

    if (!visited.some(([vr, vc]) => vr === r && vc === c)) {
      visited.push([r, c]);
      setVisited([...visited]);
      await delay(speedRef.current); 
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 0) {
        const tentativeG = gScore[r][c] + 1;

        if (tentativeG < gScore[nr][nc]) {
          parent[`${nr},${nc}`] = [r, c];
          gScore[nr][nc] = tentativeG;
          fScore[nr][nc] = tentativeG + heuristic([nr, nc], end);

          if (!openSet.some(([or, oc]) => or === nr && oc === nc)) {
            openSet.push([nr, nc, fScore[nr][nc]]);
          }
        }
      }
    }
  }

  alert("No path found!");
  setRunning(false);
};
