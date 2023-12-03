export type Game = {
  index: number;
  sets: {
    red: number;
    green: number;
    blue: number;
  }[];
};

export function parse(input: string): Game[] {
  return input.split("\n").map((gameAsString, index) => {
    return {
      index: index + 1,
      sets: gameAsString
        .replace(`Game ${index + 1}: `, "")
        .split(";")
        .map((setAsString) => {
          const set = { red: 0, green: 0, blue: 0 };
          const splitValue = setAsString.trim().split(", ");

          for (const value of splitValue) {
            const [amount, color] = value.trim().split(" ");

            if (color === "red") {
              set.red += Number(amount);
            } else if (color === "green") {
              set.green += Number(amount);
            } else if (color === "blue") {
              set.blue += Number(amount);
            } else {
              throw new Error(`Unknown color: ${color}`);
            }
          }

          return set;
        }),
    };
  });
}
