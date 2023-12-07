import { day7Input } from "./input.js";
import { parse } from "./parse.js";
import { sortGameTypeByBestTypeAscending } from "./poker.js";

export function part1(input = day7Input) {
  const game = parse(input);

  const sortedGame = sortGameTypeByBestTypeAscending(game);

  const sum = sortedGame.players
    .map((player, index) => {
      return player.bid * (index + 1);
    })
    .reduce((a, b) => a + b, 0);

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = day7Input) {
  const game = parse(input);

  const sortedGame = sortGameTypeByBestTypeAscending(game, true);

  const sum = sortedGame.players
    .map((player, index) => {
      return player.bid * (index + 1);
    })
    .reduce((a, b) => a + b, 0);

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
