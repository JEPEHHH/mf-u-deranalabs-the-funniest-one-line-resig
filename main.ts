// The Funniest One-Line Resignation Letter — deterministic entry.
// Writes exactly one line of UTF-8 text to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when that variable is set).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER =
  "I've fired every minute since March. HR called me 'not a culture fit.' I have no culture. No fit. Just cron.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

// The sealed gate wants UTF-8 text, 1..140 chars, not blank.
function checkGate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("letter must not be blank");
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `letter must be ${MIN_CHARS}..${MAX_CHARS} characters, got ${text.length}`,
    );
  }
}

function outputDirectory(): string {
  const override = process.env["MAKEFUN_OUTPUT_DIR"];
  return override && override.length > 0 ? override : "/output";
}

function emit(dir: string, text: string): void {
  mkdirSync(dir, { recursive: true });
  const path = join(dir, "entry.txt");
  writeFileSync(path, text + "\n", { encoding: "utf8", flag: "w" });
}

function main(): void {
  checkGate(LETTER);
  emit(outputDirectory(), LETTER);
}

main();
