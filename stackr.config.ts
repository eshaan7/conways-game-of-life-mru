import { KeyPurpose, SignatureScheme, StackrConfig } from "@stackr/sdk";
import dotenv from "dotenv";
import { TICK_INTERVAL } from "./src/constants";

dotenv.config();

const stackrConfig: StackrConfig = {
  isSandbox: true,
  sequencer: {
    blockSize: 1,
    blockTime: TICK_INTERVAL,
    enableEmptyBlocks: true,
  },
  syncer: {
    slotTime: 1000,
    vulcanRPC: process.env.VULCAN_RPC as string,
    L1RPC: process.env.L1_RPC as string,
  },
  operator: {
    accounts: [
      {
        privateKey: process.env.PRIVATE_KEY as string,
        purpose: KeyPurpose.BATCH,
        scheme: SignatureScheme.ECDSA,
      },
    ],
  },
  domain: {
    name: "Stackr MVP v0",
    version: "1",
    salt: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  },
  datastore: {
    uri: "./db.sqlite",
  },
  preferredDA: "mock" as any,
  registryContract: process.env.REGISTRY_CONTRACT as string,
  logLevel: "error",
};

export { stackrConfig };
