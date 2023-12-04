export type Game = {
  cards: {
    index: number;
    winningNumbers: Set<number>;
    numbersWeHave: Set<number>;
  }[];
};

export function parse(input: string): Game {
  const cards = input.split("\n").map((cardLine, index) => {
    const numbers = cardLine
      .replace(`Card ${(index + 1).toString().padStart(3, " ")}:`, "")
      .trim()
      .split(" | ");

    return {
      index: index + 1,
      winningNumbers: new Set(
        numbers[0]
          ?.trim()
          .split(" ")
          .map((n) => Number(n.trim()))
          .filter((n) => n !== 0),
      ),
      numbersWeHave: new Set(
        numbers[1]
          ?.trim()
          .split(" ")
          .map((n) => Number(n.trim()))
          .filter((n) => n !== 0),
      ),
    };
  });

  return { cards };
}
