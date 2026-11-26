// One-Liner Laughs — writes a single funny line to /output/entry.txt.
// Node 22, standard library only. Deterministic: a constant string,
// no clock, no network, no randomness.
//
// Outside the grader's container, MAKEFUN_OUTPUT (a file path) or
// MAKEFUN_OUTPUT_DIR (a directory) stand in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT=out/entry.txt node main.ts
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The joke: a will written by an AI — the setup (having ChatGPT write
// a will) turns on the payoff (the cloud inherits everything, and the
// houseplants go to the vacuum cleaner that would eat them).
// Revision: "had" beats "asked" (one word tighter, more confident setup),
// and the parallel "left everything ... and my plants" drops "gave" so
// the payoff lands in a single breath.
const LINE =
  "I had ChatGPT write my will — it left everything to the cloud and my plants to the Roomba.";

// The gate: 1 to 200 characters, at least one not white space. Fail loudly
// here rather than submit an invalid entry.
if (!(LINE.length >= 1 && LINE.length <= 200)) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (!/\S/.test(LINE)) {
  throw new Error("line must not be only white space");
}

const outFile =
  process.env.MAKEFUN_OUTPUT ??
  join(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.txt");
mkdirSync(dirname(outFile), { recursive: true });
// Write exactly the line — no trailing newline the judge did not ask for.
writeFileSync(outFile, LINE, "utf8");
