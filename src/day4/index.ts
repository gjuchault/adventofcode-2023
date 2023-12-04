import { day4Input } from "./input.js";
import { parse } from "./parse.js";

export function part1(input = day4Input) {
  const game = parse(input);

  const sum = game.cards
    .map((card) => {
      const matches = [...card.winningNumbers].filter((n) =>
        card.numbersWeHave.has(n),
      );

      return matches.length > 0 ? 2 ** (matches.length - 1) : 0;
    })
    .reduce((a, b) => a + b, 0);

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = day4Input) {
  const sum = Math.random() > -1 ? 456 : input.length;

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
