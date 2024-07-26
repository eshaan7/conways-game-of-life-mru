import { ExecutorEvents, type ExecuteBlockEventArgs } from "@stackr/sdk";
import chalk from "chalk";

import { mru } from "./stackr/mru";
import { TState } from "./stackr/machine";

const main = async (): Promise<void> => {
  await mru.init();

  mru.events.subscribe(
    ExecutorEvents.EXECUTE_BLOCK,
    async (args: ExecuteBlockEventArgs) => {
      const { previousState, state } = args;
      const { grid: previousGrid } = JSON.parse(previousState) as TState;
      const { grid, generation, status } = JSON.parse(state) as TState;
      // print
      console.clear();
      console.log("\n");
      console.log("-".repeat(20))
      console.log("Generation:", generation);
      console.log("Status:", status);
      const previousAlive = previousGrid.reduce(
        (acc, row) => row.reduce((acc2, cell) => acc2 + cell, acc),
        0
      );
      const alive = grid.reduce(
        (acc, row) => row.reduce((acc2, cell) => acc2 + cell, acc),
        0
      );
      const dead = grid.length * grid[0].length - alive;
      console.log("Alive:", alive, "cells");
      console.log("Dead:", dead, "cells");
      console.log("Change:", alive - previousAlive, "cells");
      console.log("-".repeat(20))
      console.log("\n");
      console.log(
        grid
          .map((row) =>
            row
              .map((cell) => (cell === 1 ? chalk.green("■") : chalk.gray("□")))
              .join(" ")
          )
          .join("\n")
      );
    }
  );
};

await main();
