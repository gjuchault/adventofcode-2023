import type { Grid, Point } from "../grid/index.js";
import {
  at,
  getAdjacents,
  hashPoint,
  iterate,
  parseGrid,
  uniquePoints,
} from "../grid/index.js";
import { uniqueArray } from "../helpers/unique.js";
import { day3Input } from "./input.js";

type GridCell = number | "gear" | "symbol" | "nil";

function getPartFromPoint(
  grid: Grid<GridCell>,
  point: Point,
): [Point, ...Point[]] {
  const result = [point];

  let leftCursor = point;
  let rightCursor = point;

  while (true) {
    const left = at(grid, leftCursor);

    if (typeof left === "number") {
      result.push(leftCursor);
      leftCursor = [leftCursor[0] - 1, leftCursor[1]];
      continue;
    }

    break;
  }

  while (true) {
    const right = at(grid, rightCursor);

    if (typeof right === "number") {
      result.push(rightCursor);
      rightCursor = [rightCursor[0] + 1, rightCursor[1]];
      continue;
    }

    break;
  }

  return uniquePoints(result.sort((a, b) => a[0] - b[0])) as [
    Point,
    ...Point[],
  ];
}

export function part1(input = day3Input) {
  const grid = parseGrid(input, (c): GridCell => {
    if (c === ".") {
      return "nil";
    }

    if (Number.isInteger(Number(c))) {
      return Number(c);
    }

    return "symbol";
  });

  let sum = 0;

  iterate(grid, (symbolPoint, cell) => {
    if (cell !== "symbol") {
      return;
    }

    const adjacents = getAdjacents(grid, symbolPoint, true);

    const adjacentParts = adjacents
      .filter(({ cell }) => typeof cell === "number")
      .map(({ point }) => getPartFromPoint(grid, point));

    const uniqueAdjacentParts = uniqueArray(adjacentParts, (part) =>
      hashPoint(part[0]),
    );

    const adjacentPartsAsNumbers = uniqueAdjacentParts.map((points) =>
      Number(points.map((p) => at(grid, p)).join("")),
    );

    sum += adjacentPartsAsNumbers.reduce((a, b) => a + b, 0);
  });

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = day3Input) {
  const grid = parseGrid(input, (c): GridCell => {
    if (c === ".") {
      return "nil";
    }

    if (Number.isInteger(Number(c))) {
      return Number(c);
    }

    return "symbol";
  });

  let sum = 0;

  iterate(grid, (symbolPoint, cell) => {
    if (cell !== "symbol") {
      return;
    }

    const adjacents = getAdjacents(grid, symbolPoint, true);

    const adjacentParts = adjacents
      .filter(({ cell }) => typeof cell === "number")
      .map(({ point }) => getPartFromPoint(grid, point));

    const uniqueAdjacentParts = uniqueArray(adjacentParts, (part) =>
      hashPoint(part[0]),
    );

    const adjacentPartsAsNumbers = uniqueAdjacentParts.map((points) =>
      Number(points.map((p) => at(grid, p)).join("")),
    );

    if (adjacentPartsAsNumbers.length !== 2) {
      return;
    }

    const gearRatio = adjacentPartsAsNumbers[0]! * adjacentPartsAsNumbers[1]!;

    sum += gearRatio;
  });

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
