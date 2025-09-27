import { gridStore } from "../../state/zustand";
import { delay } from "../../utils/utils";

export const runDijkstra = async (start, end, speed) => {
  const { grid, setVisited, setPath } = gridStore.getState();

  const rows = grid.length;
  const cols = grid[0].length;

  // Directions (up, down, left, right)
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const inBounds = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;

  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null));

  const visitedOrder = [];
  const pq = [[0, start[0], start[1]]]; 
  dist[start[0]][start[1]] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = pq.shift();

    if (dist[r][c] < d) continue;

    visitedOrder.push([r, c]);
    setVisited([...visitedOrder]);
    await delay(speed);

    if (r === end[0] && c === end[1]) break;

    for (let [dr, dc] of directions) {
      const nr = r + dr,
        nc = c + dc;
      if (!inBounds(nr, nc) || grid[nr][nc] === 1) continue;
      const newDist = d + 1;
      if (newDist < dist[nr][nc]) {
        dist[nr][nc] = newDist;
        prev[nr][nc] = [r, c];
        pq.push([newDist, nr, nc]);
      }
    }
  }

  let path = [];
  let cur = end;
  while (cur) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }
  path.reverse();
  setPath(path);
};
