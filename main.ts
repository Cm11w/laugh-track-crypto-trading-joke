// Laugh Track: The Crypto Trading Joke — make.fun entry (program/v1, Node 22, stdlib only).
//
// One line about crypto and trading life. The joke turns on TA vocabulary:
// a coin "finding strong support" sounds like good news until the support
// turns out to be at zero — and the kicker doubles down on the irony by
// praising how beautifully zero has held. Fixed string constant: no input,
// no clock, no randomness, no network, so every run writes byte-identical
// output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke, exactly as the judge will read it.
const JOKE =
  "My coin found strong support at zero. It has held beautifully ever since.";

// Gate (from RULES.txt / competition.yaml): /output/entry.txt must be UTF-8
// text of 1 to 200 characters, not only white space. Refuse to write
// anything that would ever leave that gate.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} characters, outside the 1-200 gate`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke is only white space");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("joke has leading or trailing white space");
}
if (/[\r\n]/.test(JOKE)) {
  throw new Error("joke must be a single line");
}
// Control characters (other than the line breaks already rejected above)
// would make the text unreadable as a one-liner, so refuse them too.
if (/[\u0000-\u001f\u007f]/.test(JOKE)) {
  throw new Error("joke contains control characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
