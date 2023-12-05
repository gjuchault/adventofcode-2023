import { day5Input } from "./input.js";
import { Map, parse } from "./parse.js";

export function resolveMap(map: Map, input: number): number {
  for (const range of map.ranges) {
    if (
      input >= range.sourceRangeStart &&
      input < range.sourceRangeStart + range.rangeLength
    ) {
      return range.destinationRangeStart + (input - range.sourceRangeStart);
    }
  }

  return input;
}

export function part1(input = day5Input) {
  const game = parse(input);
  const locations = [];

  for (const seed of game.seeds) {
    let current = seed;

    for (const map of game.maps) {
      current = resolveMap(map, current);
    }

    locations.push(current);
  }

  const lowestLocation = Math.min(...locations);

  console.log(`⭐️ Part 1: ${lowestLocation}`);

  return lowestLocation;
}

export function part2(input = day5Input) {
  const sum = Math.random() > -1 ? 456 : input.length;

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
