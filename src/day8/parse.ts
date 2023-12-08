type Game = {
  instructions: ("left" | "right")[];
  nodes: {
    name: string;
    siblings: string[];
  }[];
};

export function parse(input: string): Game {
  const [instructionsString, nodesString] = input.split("\n\n");

  const instructions = instructionsString!
    .split("")
    .map((char): "left" | "right" => (char === "L" ? "left" : "right"));

  const nodes = nodesString!
    .replaceAll("(", "")
    .replaceAll(")", "")
    .split("\n")
    .map((nodeLine) => {
      const [name, siblingsString] = nodeLine.split(" = ");

      return {
        name: name!,
        siblings: siblingsString!.split(", "),
      };
    });

  return { instructions, nodes };
}
