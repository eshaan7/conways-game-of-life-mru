import { Hook, Hooks } from "@stackr/sdk/machine";

import { Cell, GOLState, Grid } from "./machine";
import { OSCILLATIONS_MAX_HISTORY } from "../constants";

const getNeighbors = (grid: Grid, x: number, y: number): Cell[] => {
  const neighbors: Cell[] = [];
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
      neighbors.push(grid[nx][ny]);
    }
  }

  return neighbors;
};

const gridsEqual = (grid1: Grid, grid2: Grid): boolean => {
  if (grid1.length !== grid2.length) return false;
  for (let i = 0; i < grid1.length; i++) {
    if (grid1[i].length !== grid2[i].length) return false;
    for (let j = 0; j < grid1[i].length; j++) {
      if (grid1[i][j] !== grid2[i][j]) return false;
    }
  }
  return true;
};

const IsGridEmpty = (grid: Grid): boolean => {
  return grid.every((row) => row.every((cell) => cell === 0));
};

const nextGeneration: Hook<GOLState> = {
  handler: ({ state }) => {
    let { grid, history, generation, status } = state;

    const newGrid: Grid = grid.map((arr) => [...arr]);
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const neighbors = getNeighbors(grid, x, y);
        const aliveNeighbors = neighbors.filter((n) => n === 1).length;

        if (grid[x][y] === 1) {
          // Any live cell with two or three live neighbors survives.
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            newGrid[x][y] = 0;
          }
        } else {
          // Any dead cell with exactly three live neighbors becomes a live cell.
          if (aliveNeighbors === 3) {
            newGrid[x][y] = 1;
          }
        }
      }
    }

    // Check for empty grid
    if (IsGridEmpty(grid)) {
      status = "empty";
    }
    // Check for static grid
    else if (gridsEqual(newGrid, grid)) {
      status = "static";
    }
    // Check for oscillating grid
    else if (
      history.length >= OSCILLATIONS_MAX_HISTORY &&
      history
        .slice(history.length - OSCILLATIONS_MAX_HISTORY)
        .some((prevGrid) => gridsEqual(prevGrid, grid))
    ) {
      status = "oscillating";
    }

    return {
      grid: newGrid,
      history: [...history, grid],
      generation: generation + 1,
      status,
    };
  },
};

export const hooks: Hooks<GOLState> = {
  nextGeneration,
};
