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
  const game = parse(input);

  const cardNumberByIndex = new Map<number, number>(
    game.cards.map((c) => [c.index, 1]),
  );

  for (let index = 1; index <= game.cards.length; index++) {
    const cardCount = cardNumberByIndex.get(index)!;
    const card = game.cards[index - 1]!;

    const matches = [...card.winningNumbers].filter((n) =>
      card.numbersWeHave.has(n),
    );

    let count = 1;

    while (count <= matches.length) {
      cardNumberByIndex.set(
        index + count,
        cardNumberByIndex.get(index + count)! + cardCount,
      );
      count += 1;
    }
  }

  const sum = [...cardNumberByIndex.values()].reduce((a, b) => a + b, 0);

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
