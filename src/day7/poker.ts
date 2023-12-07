import { fillCombination } from "../helpers/combinations.js";
import { Game } from "./parse.js";

export const cardsLevel = {
  two: 1,
  three: 2,
  four: 3,
  five: 4,
  six: 5,
  seven: 6,
  eight: 7,
  nine: 8,
  ten: 9,
  jack: 10,
  queen: 11,
  king: 12,
  as: 13,
} as const;

export const cardsLevelJoker = {
  jack: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  queen: 11,
  king: 12,
  as: 13,
} as const;

export type Card = keyof typeof cardsLevel;

export const handTypeLevel = {
  highCard: 0,
  onePair: 1,
  twoPair: 2,
  threeOfAKind: 3,
  fullHouse: 4,
  fourOfAKind: 5,
  fiveOfAKind: 6,
};

export type HandType =
  | { level: "fiveOfAKind"; card: Card }
  | { level: "fourOfAKind"; card: Card }
  | { level: "fullHouse"; threeCard: Card; twoCard: Card }
  | { level: "threeOfAKind"; card: Card }
  | { level: "twoPair"; pairs: [Card, Card] }
  | { level: "onePair"; card: Card }
  | { level: "highCard" };

export function sortGameTypeByBestTypeAscending(
  game: Game,
  joker = false,
): Game {
  return {
    players: game.players.sort((playerA, playerB) => {
      const handTypeA = joker
        ? getHandTypeJoker(playerA.hand)
        : getHandType(playerA.hand);
      const handTypeB = joker
        ? getHandTypeJoker(playerB.hand)
        : getHandType(playerB.hand);

      if (handTypeA.level === handTypeB.level) {
        for (let i = 0; i < playerA.hand.length; i++) {
          const cardA = playerA.hand[i]!;
          const cardB = playerB.hand[i]!;

          if (cardA === cardB) {
            continue;
          }

          if (joker) {
            return cardsLevelJoker[cardA] - cardsLevelJoker[cardB];
          }

          return cardsLevel[cardA] - cardsLevel[cardB];
        }

        return 0;
      }

      return handTypeLevel[handTypeA.level] - handTypeLevel[handTypeB.level];
    }),
  };
}

export function getHandTypeJoker(hand: Card[]): HandType {
  const allCombinations = fillCombination<Card>(
    hand,
    "jack",
    Object.keys(cardsLevel).filter((card) => card !== "jack") as Card[],
  );

  const bestCombination = allCombinations
    .sort((cardsA, cardsB) => {
      const handTypeA = getHandType(cardsA);
      const handTypeB = getHandType(cardsB);

      if (handTypeA.level === handTypeB.level) {
        for (let i = 0; i < cardsA.length; i++) {
          const cardA = cardsA[i]!;
          const cardB = cardsB[i]!;

          if (cardA === cardB) {
            continue;
          }

          return cardsLevel[cardA] - cardsLevel[cardB];
        }
      }

      return handTypeLevel[handTypeA.level] - handTypeLevel[handTypeB.level];
    })
    .at(-1)!;

  return getHandType(bestCombination);
}

export function getHandType(hand: Card[]): HandType {
  const cardCounts: Partial<Record<Card, number>> = {};

  for (const card of hand) {
    cardCounts[card] = (cardCounts[card] ?? 0) + 1;
  }

  const cardCountsEntries = (
    Object.entries(cardCounts) as [Card, number][]
  ).sort(([, countA], [, countB]) => {
    return countB - countA;
  });

  for (const [card, count] of cardCountsEntries) {
    if (count === 5) {
      return { level: "fiveOfAKind", card };
    }

    if (count === 4) {
      return { level: "fourOfAKind", card };
    }

    if (count === 3) {
      const rest = hand.filter((handCard) => handCard !== card) as [Card, Card];

      if (rest.length === 2 && rest[0] === rest[1]) {
        return {
          level: "fullHouse",
          threeCard: card,
          twoCard: rest[0]!,
        };
      }

      return { level: "threeOfAKind", card };
    }

    if (count === 2) {
      const rest = hand.filter((handCard) => handCard !== card) as [
        Card,
        Card,
        Card,
      ];

      const restCount = Object.fromEntries(
        Object.keys(cardsLevel).map((card) => [card, 0]),
      ) as Record<Card, number>;

      for (const card of rest) {
        restCount[card] = restCount[card] += 1;
      }

      if (Object.values(restCount).some((count) => count === 2)) {
        const otherCard = Object.entries(restCount).find(
          ([, count]) => count === 2,
        )![0] as Card;

        return { level: "twoPair", pairs: [card, otherCard] };
      }

      return { level: "onePair", card };
    }
  }

  // highCard is actually not _high card_, it's just regular card by card compare
  return {
    level: "highCard",
  };
}
