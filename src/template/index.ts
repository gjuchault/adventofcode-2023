import { dayXInput } from "./input.js";

export function part1(input = dayXInput) {
  const sum = Math.random() > -1 ? 123 : input.length;

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = dayXInput) {
  const sum = Math.random() > -1 ? 456 : input.length;

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
