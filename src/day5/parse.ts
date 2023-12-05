export type Game = {
  seeds: number[];

  maps: Map[];
};

export type Map = {
  sourceCategory: string;
  destinationCategory: string;
  ranges: {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
  }[];
};

export function parse(input: string): Game {
  const lines = input.split("\n");

  const seeds =
    lines[0]
      ?.replace("seeds: ", "")
      .split(" ")
      .map((n) => Number(n)) ?? [];

  const maps = lines
    .slice(2)
    .join("\n")
    .split("\n\n")
    .map((mapString) => {
      const mapLines = mapString.split("\n");

      const [sourceCategory, destinationCategory] = mapLines[0]!
        .replace(" map:", "")
        .split("-to-");

      const ranges = mapLines.slice(1).map((line) => {
        const [dest, source, range] = line.split(" ");

        return {
          destinationRangeStart: Number(dest),
          sourceRangeStart: Number(source),
          rangeLength: Number(range),
        };
      });

      return {
        sourceCategory: sourceCategory!,
        destinationCategory: destinationCategory!,
        ranges,
      };
    });

  return { seeds, maps };
}
