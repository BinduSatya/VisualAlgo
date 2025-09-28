import { gridStore } from "../../state/zustand";
import { delay } from "../../utils/utils.js";

export const runBidirectionalBFS = async (speedRef) => {
  const { start, end, grid, setVisited, setPath } = gridStore.getState();

  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const inBounds = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;

  const visitedFromStart = new Set([`${start[0]}-${start[1]}`]);
  const visitedFromEnd = new Set([`${end[0]}-${end[1]}`]);

  let queueStart = [start];
  let queueEnd = [end];

  const prevStart = Array.from({ length: rows }, () => Array(cols).fill(null));
  const prevEnd = Array.from({ length: rows }, () => Array(cols).fill(null));

  let meetingPoint = null;
  let visitedOrder = [];

  while (queueStart.length && queueEnd.length) {
    const nextQueueStart = [];
    for (let [r, c] of queueStart) {
      visitedOrder.push([r, c]);
      setVisited([...visitedOrder]);
      await delay(speedRef.current);

      for (let [dr, dc] of directions) {
        const nr = r + dr,
          nc = c + dc;
        const key = `${nr}-${nc}`;
        if (
          !inBounds(nr, nc) ||
          grid[nr][nc] === 1 ||
          visitedFromStart.has(key)
        )
          continue;
        visitedFromStart.add(key);
        prevStart[nr][nc] = [r, c];
        nextQueueStart.push([nr, nc]);
        if (visitedFromEnd.has(key)) {
          meetingPoint = [nr, nc];
          break;
        }
      }
      if (meetingPoint) break;
    }
    if (meetingPoint) break;
    queueStart = nextQueueStart;

    const nextQueueEnd = [];
    for (let [r, c] of queueEnd) {
      visitedOrder.push([r, c]);
      setVisited([...visitedOrder]);
      await delay(speedRef.current);

      for (let [dr, dc] of directions) {
        const nr = r + dr,
          nc = c + dc;
        const key = `${nr}-${nc}`;
        if (!inBounds(nr, nc) || grid[nr][nc] === 1 || visitedFromEnd.has(key))
          continue;
        visitedFromEnd.add(key);
        prevEnd[nr][nc] = [r, c];
        nextQueueEnd.push([nr, nc]);
        if (visitedFromStart.has(key)) {
          meetingPoint = [nr, nc];
          break;
        }
      }
      if (meetingPoint) break;
    }
    if (meetingPoint) break;
    queueEnd = nextQueueEnd;
  }
  if (!meetingPoint) {
    setPath([]);
    return;
  }

  const pathStart = [];
  let cur = meetingPoint;
  while (cur) {
    pathStart.push(cur);
    cur = prevStart[cur[0]][cur[1]];
  }
  pathStart.reverse();

  const pathEnd = [];
  cur = prevEnd[meetingPoint[0]][meetingPoint[1]];
  while (cur) {
    pathEnd.push(cur);
    cur = prevEnd[cur[0]][cur[1]];
  }

  const finalPath = [...pathStart, ...pathEnd];
  setPath(finalPath);
};
