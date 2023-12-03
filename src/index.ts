#!/usr/bin/env node

import { cp, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { part1 as d1p1, part2 as d1p2 } from "./day1/index.js";
import { part1 as d2p1, part2 as d2p2 } from "./day2/index.js";
// template: import

const argv = await yargs(hideBin(process.argv)).argv;

if (argv._ === undefined) {
  console.log(`Expected a day to run`);
  process.exit(1);
}

const day = Number(argv._);

if (Number.isNaN(day)) {
  console.log(`Expected a valid day number to run`);
  process.exit(1);
}

if (argv.new === undefined) {
  switch (day) {
    case 1:
      d1p1();
      d1p2();
      break;
    case 2:
      d2p1();
      d2p2();
      break;
    // template: case
    default:
      console.log(`Day not implemented yet`);
      process.exit(1);
  }
} else {
  console.log("Creating new day");

  const target = join(process.cwd(), `src/day${day}`);
  const testFileTarget = join(target, `__tests__/day${day}.test.ts`);
  const indexFileTarget = join(target, `index.ts`);
  const inputFileTarget = join(target, `input.ts`);
  const indexFile = join(process.cwd(), `src/index.ts`);

  await cp(join(process.cwd(), "src/template"), target, { recursive: true });

  await rename(
    join(target, "__tests__/dayX.test.ts"),
    join(target, `__tests__/day${day}.test.ts`),
  );

  await writeFile(
    testFileTarget,
    (await readFile(testFileTarget, "utf-8")).replaceAll("X", `${day}`),
  );

  await writeFile(
    indexFileTarget,
    (await readFile(indexFileTarget, "utf-8")).replaceAll("X", `${day}`),
  );

  await writeFile(
    inputFileTarget,
    (await readFile(inputFileTarget, "utf-8")).replaceAll("X", `${day}`),
  );

  await writeFile(
    indexFile,
    (await readFile(indexFile, "utf-8"))
      .replace(
        "// template: import",
        [
          `import { part1 as d${day}p1, part2 as d${day}p2 } from "./day${day}/index.js";`,
          `// template: import`,
        ].join("\n"),
      )
      .replace(
        "    // template: case",
        [
          `    case ${day}:`,
          `      d${day}p1();`,
          `      d${day}p2();`,
          `      break;`,
          `    // template: case`,
        ].join("\n"),
      ),
  );
}
