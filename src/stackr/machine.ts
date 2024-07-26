import { State, StateMachine } from "@stackr/sdk/machine";
import { solidityPackedKeccak256 } from "ethers";

import { hooks } from "./hooks";
import { GRID_SIZE } from "../constants";

export type Cell = 0 | 1;
export type Grid = Cell[][];
export type TState = {
  grid: Grid;
  history: Grid[];
  generation: number;
  status: "running" | "empty" | "static" | "oscillating";
};

const initialState: TState = {
  grid: Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => (Math.random() > 0.5 ? 1 : 0))
  ),
  history: [],
  generation: 0,
  status: "running",
};

export class GOLState extends State<TState> {
  constructor(state: TState) {
    super(state);
  }

  getRootHash(): string {
    const { grid, generation } = this.state;
    return solidityPackedKeccak256(
      ["string", "uint256"],
      [JSON.stringify(grid), generation]
    );
  }
}

export const golStateMachine = new StateMachine({
  id: "conways-game-of-life",
  stateClass: GOLState,
  on: [] as any,
  initialState,
  hooks,
});
