import { day2Input } from "./input.js";
import { parse } from "./parse.js";

export function part1(input = day2Input) {
  const maxInBag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sum = 0;

  for (const { index, sets } of parse(input)) {
    let isGamePossible = true;

    for (const set of sets) {
      if (
        set.blue > maxInBag.blue ||
        set.red > maxInBag.red ||
        set.green > maxInBag.green
      ) {
        isGamePossible = false;
        break;
      }
    }

    if (!isGamePossible) {
      continue;
    }

    sum += index;
  }

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = day2Input) {
  let sum = 0;

  for (const { sets } of parse(input)) {
    const minPerBag = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const set of sets) {
      minPerBag.red = Math.max(minPerBag.red, set.red);
      minPerBag.green = Math.max(minPerBag.green, set.green);
      minPerBag.blue = Math.max(minPerBag.blue, set.blue);
    }

    sum += minPerBag.red * minPerBag.green * minPerBag.blue;
  }

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
