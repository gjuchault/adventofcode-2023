import { day1Input } from "./input.js";

function isDigit(digit: string): boolean {
  return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(digit);
}

export function part1(input = day1Input) {
  let sum = 0;

  for (const line of input.split("\n")) {
    let firstDigit = 0;
    let lastDigit = 0;

    const chars = line.split("");

    for (const char of chars) {
      if (isDigit(char)) {
        firstDigit = Number(char);
        break;
      }
    }

    for (const char of chars.toReversed()) {
      if (isDigit(char)) {
        lastDigit = Number(char);
        break;
      }
    }

    sum += firstDigit * 10 + lastDigit;
  }

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export async function part2() {}
