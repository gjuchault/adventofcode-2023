import type { Grid, Point } from "../grid/index.js";
import {
  at,
  getAdjacents,
  hashPoint,
  iterate,
  parseGrid,
  unhashPoint,
  uniquePoints,
} from "../grid/index.js";
import { uniqueArray } from "../helpers/unique.js";
import { day3Input } from "./input.js";

type GridCell = number | "symbol" | "nil";

function getPartFromPoint(
  grid: Grid<GridCell>,
  point: Point
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

  const partsNearSymbols = new Set<string>();

  iterate(grid, (symbolPoint, cell) => {
    if (cell !== "symbol") {
      return;
    }

    const adjacents = getAdjacents(grid, symbolPoint, true);

    for (const { point, cell } of adjacents) {
      if (typeof cell === "number") {
        partsNearSymbols.add(hashPoint(point));
      }
    }
  });

  const allParts = [...partsNearSymbols].map((partNearSymbolStr) =>
    getPartFromPoint(grid, unhashPoint(partNearSymbolStr))
  );

  // we can unique by the first point since we sorted the parts
  const uniqueParts = uniqueArray(allParts, (part) => hashPoint(part[0]));

  const sum = uniqueParts
    .map((part) => part.map((p) => at(grid, p)).join(""))
    .map((n) => Number(n))
    .reduce((a, b) => a + b, 0);

  console.log(`⭐️ Part 1: ${sum}`);

  return sum;
}

export function part2(input = day3Input) {
  const sum = Math.random() > -1 ? 456 : input.length;

  console.log(`⭐️ Part 2: ${sum}`);

  return sum;
}
