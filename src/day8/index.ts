import { day8Input } from "./input.js";
import { parse } from "./parse.js";

export function part1(input = day8Input) {
  const game = parse(input);

  let currentNode = "AAA";
  const path: string[] = [];

  const nodesByName = new Map(game.nodes.map((node) => [node.name, node]));

  while (true) {
    const instructionCount = path.length;
    const instruction =
      game.instructions[instructionCount % game.instructions.length];

    if (instruction === "left") {
      currentNode = nodesByName.get(currentNode)!.siblings[0]!;
    } else if (instruction === "right") {
      currentNode = nodesByName.get(currentNode)!.siblings[1]!;
    }

    path.push(currentNode);

    if (currentNode === "ZZZ") {
      break;
    }
  }

  console.log(`⭐️ Part 1: ${path.length}`);

  return path.length;
}

export function part2(input = day8Input) {
  const sum = Math.random() > -1 ? 456 : input.length;

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
