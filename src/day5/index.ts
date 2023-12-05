import { day5Input } from "./input.js";
import { Game, parse } from "./parse.js";

export function seedToLocation(game: Game, seed: number): number {
  return game.maps.reduce((current, maps) => {
    for (const {
      destinationRangeStart,
      rangeLength,
      sourceRangeStart,
    } of maps.ranges) {
      if (
        current >= sourceRangeStart &&
        current <= sourceRangeStart + rangeLength - 1
      ) {
        return destinationRangeStart + (current - sourceRangeStart);
      }
    }

    return current;
  }, seed);
}

export function locationToSeed(game: Game, location: number): number {
  return game.maps.reduceRight((current, maps) => {
    for (const {
      destinationRangeStart,
      rangeLength,
      sourceRangeStart,
    } of maps.ranges) {
      if (
        current >= destinationRangeStart &&
        current <= destinationRangeStart + rangeLength - 1
      ) {
        return sourceRangeStart + (current - destinationRangeStart);
      }
    }

    return current;
  }, location);
}

export function part1(input = day5Input) {
  const game = parse(input);
  let minimumLocation = Number.POSITIVE_INFINITY;

  for (const seed of game.seeds) {
    const location = seedToLocation(game, seed);

    if (minimumLocation > location) {
      minimumLocation = location;
    }
  }

  console.log(`⭐️ Part 1: ${minimumLocation}`);

  return minimumLocation;
}

function isValidSeed(game: Game, seed: number): boolean {
  for (let i = 0; i < game.seeds.length; i += 2) {
    if (seed >= game.seeds[i]! && seed < game.seeds[i]! + game.seeds[i + 1]!)
      return true;
  }
  return false;
}

export function part2(input = day5Input) {
  const game = parse(input);

  const candidateSeeds = game.maps
    .flatMap((maps, i) =>
      maps.ranges.map((map) =>
        locationToSeed(
          { ...game, maps: game.maps.slice(0, i + 1) },
          map.destinationRangeStart,
        ),
      ),
    )
    .filter((seed) => isValidSeed(game, seed));

  let minimumLocation = Number.POSITIVE_INFINITY;

  for (const seed of candidateSeeds) {
    const location = seedToLocation(game, seed);

    if (minimumLocation > location) {
      minimumLocation = location;
    }
  }

  console.log(`⭐️ Part 2: ${minimumLocation}`);

  return minimumLocation;
}
