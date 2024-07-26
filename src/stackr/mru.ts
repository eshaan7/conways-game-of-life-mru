import { MicroRollup } from "@stackr/sdk";

import { stackrConfig } from "../../stackr.config";
import { golStateMachine } from "./machine";

const mru = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [],
  stateMachines: [golStateMachine],
  blockHooks: {
    pre: ["nextGeneration"],
  }
});

export { mru };
