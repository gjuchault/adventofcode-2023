import { leastCommonMultiple } from "../helpers/arithmetics.js";
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
  const game = parse(input);

  const nodesByName = new Map(game.nodes.map((node) => [node.name, node]));
  const startingNodesToProcess = game.nodes.filter((node) =>
    node.name.endsWith("A"),
  );

  const pathsByStartingNode = new Map<string, string[]>();

  for (const startingNode of startingNodesToProcess) {
    let currentNode = startingNode.name;
    const path: string[] = [];

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

      if (currentNode.endsWith("Z")) {
        break;
      }
    }

    pathsByStartingNode.set(startingNode.name, path);
  }

  // Working value: if it takes 2 steps to go from AAA to AAZ and 3 steps to go
  // from BBA to BBZ, we can assume that it takes the LCM(2, 3) = 6 steps to
  // have everyone arrive at Z (assuming that the path is repetitive)
  const length = leastCommonMultiple(
    ...[...pathsByStartingNode.values()].map((path) => path.length),
  );

  console.log(`⭐️ Part 2: ${length}`);

  return length;
}
