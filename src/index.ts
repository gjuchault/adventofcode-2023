#!/usr/bin/env node

import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { part1 as d1p1, part2 as d1p2 } from "./day1/index.js";
import { part1 as d2p1, part2 as d2p2 } from "./day2/index.js";

const argv = await yargs(hideBin(process.argv)).argv;

if (argv._ === undefined) {
  console.log(`Expected a day to run`);
  process.exit(1);
}

// if (argv.new) {

// }

const day = Number(argv._);

if (Number.isNaN(day)) {
  console.log(`Expected a valid day number to run`);
  process.exit(1);
}

switch (day) {
  case 1:
    d1p1();
    d1p2();
    break;
  case 2:
    d2p1();
    d2p2();
    break;
  default:
    console.log(`Day not implemented yet`);
    process.exit(1);
}
