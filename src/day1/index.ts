import { day1Input } from "./input.js";

function isDigit(digit: string): boolean {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(digit);
}

function mapStringifiedDigitsToDigits(line: string, direction = 1): string {
  let output = "";
  let lineIndex = direction === 1 ? 0 : line.length - 1;
  let keepEating = true;

  function eat(word: string, replacer: string) {
    if (line.slice(lineIndex, lineIndex + word.length) === word) {
      output = direction === 1 ? output + replacer : replacer + output;
      lineIndex += direction * word.length;

      return true;
    }

    return false;
  }

  while (keepEating) {
    if (eat("one", "1")) continue;
    if (eat("two", "2")) continue;
    if (eat("three", "3")) continue;
    if (eat("four", "4")) continue;
    if (eat("five", "5")) continue;
    if (eat("six", "6")) continue;
    if (eat("seven", "7")) continue;
    if (eat("eight", "8")) continue;
    if (eat("nine", "9")) continue;

    if (line[lineIndex] === undefined) {
      break;
    }

    output =
      direction === 1 ? output + line[lineIndex] : line[lineIndex] + output;
    lineIndex += direction;
    keepEating = line[lineIndex] !== undefined;
  }

  return output;
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

export function part2(input = day1Input) {
  let sum = 0;

  for (const line of input.split("\n")) {
    let firstDigit = 0;
    let lastDigit = 0;

    for (const char of mapStringifiedDigitsToDigits(line).split("")) {
      if (isDigit(char)) {
        firstDigit = Number(char);
        break;
      }
    }

    for (const char of mapStringifiedDigitsToDigits(line, -1)
      .split("")
      .toReversed()) {
      if (isDigit(char)) {
        lastDigit = Number(char);
        break;
      }
    }

    sum += firstDigit * 10 + lastDigit;
  }

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
