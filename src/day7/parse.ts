import { Card } from "./poker.js";

export type Game = {
  players: {
    index: number;
    hand: Card[];
    bid: number;
  }[];
};

export function parse(input: string): Game {
  return {
    players: input.split("\n").map((playerString, index) => {
      const [handString, bidString] = playerString.split(" ");

      return {
        index: index + 1,
        hand: handString!.split("").map((handString) => {
          switch (handString) {
            case "A":
              return "as";
            case "K":
              return "king";
            case "Q":
              return "queen";
            case "J":
              return "jack";
            case "T":
              return "ten";
            case "9":
              return "nine";
            case "8":
              return "eight";
            case "7":
              return "seven";
            case "6":
              return "six";
            case "5":
              return "five";
            case "4":
              return "four";
            case "3":
              return "three";
            case "2":
              return "two";
            default:
              throw new Error(`Unknown card ${handString}`);
          }
        }),
        bid: Number(bidString),
      };
    }),
  };
}
