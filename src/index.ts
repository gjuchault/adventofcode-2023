#!/usr/bin/env node

import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { part1 as d1p1 } from "./day1/index.js";

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

switch (day) {
  case 1:
    await d1p1();
    break;
  default:
    console.log(`Day not implemented yet`);
    process.exit(1);
}
