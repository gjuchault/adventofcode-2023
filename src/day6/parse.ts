export type Game = {
  races: { time: number; currentRecord: number }[];
};

export function parse(input: string): Game {
  const [timeLine, distanceLine] = input.split("\n");

  const times = timeLine
    ?.replace("Time:", "")
    .trim()
    .split(/\s+/)
    .map((n) => Number(n));

  const distances = distanceLine
    ?.replace("Distance:", "")
    .trim()
    .split(/\s+/)
    .map((n) => Number(n));

  return {
    races: times!.map((time, i) => ({ time, currentRecord: distances![i]! })),
  };
}
