import { day6Input } from "./input.js";
import { parse } from "./parse.js";

export function calculateDistance(
  buttonHoldMs: number,
  maxDuration: number,
): number {
  const timeLeftToMove = maxDuration - buttonHoldMs;
  const speed = buttonHoldMs;
  const distanceReached = timeLeftToMove * speed;

  if (!Number.isSafeInteger(distanceReached)) {
    throw new Error("Distance reached is not a safe integer");
  }

  return distanceReached;
}

export function part1(input = day6Input) {
  const game = parse(input);
  let sum = 1;

  for (const race of game.races) {
    let waysToWinRace = 0;

    for (let buttonHoldMs = 0; buttonHoldMs < race.time; buttonHoldMs += 1) {
      if (race.currentRecord < calculateDistance(buttonHoldMs, race.time)) {
        waysToWinRace += 1;
      }
    }

    sum *= waysToWinRace;
  }

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = day6Input) {
  const game = parse(input);

  const uniqueRace = {
    time: Number(game.races.map(({ time }) => time).join("")),
    currentRecord: Number(
      game.races.map(({ currentRecord }) => currentRecord).join(""),
    ),
  };

  let waysToWinRace = 0;

  for (
    let buttonHoldMs = 0;
    buttonHoldMs < uniqueRace.time;
    buttonHoldMs += 1
  ) {
    if (
      uniqueRace.currentRecord <
      calculateDistance(buttonHoldMs, uniqueRace.time)
    ) {
      waysToWinRace += 1;
    }
  }

  console.log(`⭐️ Part 1: ${waysToWinRace}`);

  return waysToWinRace;
}
