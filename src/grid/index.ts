export type Grid<TCell> = {
  [y: number]: {
    [x: number]: TCell;
  };
};

export type Point = [number, number];

export function parseGrid<TCell>(
  input: string,
  parseCell: (char: string) => TCell
): Grid<TCell> {
  const lines = input.split("\n");
  const grid: Grid<TCell> = {};

  for (let y = 0; y < lines.length; y += 1) {
    const cells = lines[y]?.split("") ?? [];

    for (let x = 0; x < cells.length; x += 1) {
      grid[y] = grid[y] ?? {};
      const gridLine = grid[y];
      const cell = cells[x];

      if (gridLine !== undefined && cell !== undefined) {
        gridLine[x] = parseCell(cell);
      }
    }
  }

  return grid;
}

export function at<TCell>(grid: Grid<TCell>, point: Point): TCell | undefined {
  return grid[point[1]]?.[point[0]];
}

export function getAdjacentPoints<TCell>(
  grid: Grid<TCell>,
  point: Point,
  diagonals = false
): Point[] {
  return [
    diagonals ? [point[0] - 1, point[1] - 1] : undefined,
    diagonals ? [point[0] + 1, point[1] - 1] : undefined,
    diagonals ? [point[0] - 1, point[1] + 1] : undefined,
    diagonals ? [point[0] + 1, point[1] + 1] : undefined,

    [point[0], point[1] - 1],
    [point[0] - 1, point[1]],
    [point[0] + 1, point[1]],
    [point[0], point[1] + 1],
  ].filter((point): point is Point => point !== undefined);
}

export function getAdjacents<TCell>(
  grid: Grid<TCell>,
  point: Point,
  diagonals = false
): { point: Point; cell: TCell }[] {
  return getAdjacentPoints(grid, point, diagonals)
    .map((point): { point: Point; cell: TCell } | undefined => {
      const cell = at(grid, point);

      if (cell !== undefined) {
        return { point, cell };
      }

      return undefined;
    })
    .filter(
      (point): point is { point: Point; cell: TCell } => point !== undefined
    );
}

export function iterate<TCell>(
  grid: Grid<TCell>,
  iterator: (point: Point, cell: TCell) => void
): void {
  for (const y in grid) {
    for (const x in grid[y]) {
      const point: Point = [Number(x), Number(y)];
      const cell = at(grid, point);

      if (cell !== undefined) {
        iterator(point, cell);
      }
    }
  }
}

export function hashPoint(point: Point): string {
  return `${point[0]}:${point[1]}`;
}

export function unhashPoint(point: string): Point {
  const [x, y] = point.split(":");

  return [Number(x), Number(y)];
}

export function uniquePoints(points: Point[]): Point[] {
  const uniquePoints = new Set<string>();

  for (const point of points) {
    uniquePoints.add(hashPoint(point));
  }

  return Array.from(uniquePoints).map(unhashPoint);
}
