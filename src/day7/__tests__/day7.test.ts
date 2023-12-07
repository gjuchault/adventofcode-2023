import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { part1, part2 } from "../index.js";
import { example } from "../input.js";
import {
  getHandType,
  getHandTypeJoker,
  sortGameTypeByBestTypeAscending,
} from "../poker.js";

await describe("sortGameTypeByBestTypeAscending", async () => {
  await it("should sort first by type or by card in their order", () => {
    assert.deepEqual(
      sortGameTypeByBestTypeAscending({
        players: [
          {
            bid: 1,
            index: 1,
            hand: ["three", "three", "three", "three", "two"],
          },
          { bid: 2, index: 2, hand: ["two", "as", "as", "as", "as"] },
        ],
      }),
      {
        players: [
          { bid: 2, index: 2, hand: ["two", "as", "as", "as", "as"] },
          {
            bid: 1,
            index: 1,
            hand: ["three", "three", "three", "three", "two"],
          },
        ],
      },
    );

    assert.deepEqual(
      sortGameTypeByBestTypeAscending({
        players: [
          {
            bid: 1,
            index: 1,
            hand: ["seven", "seven", "eight", "eight", "eight"],
          },
          {
            bid: 2,
            index: 2,
            hand: ["seven", "seven", "seven", "eight", "eight"],
          },
        ],
      }),
      {
        players: [
          {
            bid: 2,
            index: 2,
            hand: ["seven", "seven", "seven", "eight", "eight"],
          },
          {
            bid: 1,
            index: 1,
            hand: ["seven", "seven", "eight", "eight", "eight"],
          },
        ],
      },
    );

    assert.deepEqual(
      sortGameTypeByBestTypeAscending(
        {
          players: [
            {
              bid: 1,
              index: 1,
              hand: ["jack", "king", "king", "king", "two"],
            },
            {
              bid: 2,
              index: 2,
              hand: ["queen", "queen", "queen", "queen", "two"],
            },
          ],
        },
        true,
      ),
      {
        players: [
          {
            bid: 1,
            index: 1,
            hand: ["jack", "king", "king", "king", "two"],
          },
          {
            bid: 2,
            index: 2,
            hand: ["queen", "queen", "queen", "queen", "two"],
          },
        ],
      },
    );
  });
});

await describe("getHandType", async () => {
  await it("should work with all hand types", () => {
    assert.deepEqual(getHandType(["as", "as", "as", "as", "as"]), {
      level: "fiveOfAKind",
      card: "as",
    });

    assert.deepEqual(getHandType(["as", "as", "eight", "as", "as"]), {
      level: "fourOfAKind",
      card: "as",
    });

    assert.deepEqual(getHandType(["as", "three", "as", "three", "as"]), {
      level: "fullHouse",
      threeCard: "as",
      twoCard: "three",
    });

    assert.deepEqual(
      getHandType(["three", "three", "three", "nine", "eight"]),
      {
        level: "threeOfAKind",
        card: "three",
      },
    );

    assert.deepEqual(getHandType(["two", "three", "four", "three", "two"]), {
      level: "twoPair",
      pairs: ["two", "three"],
    });

    assert.deepEqual(getHandType(["as", "two", "four", "as", "king"]), {
      level: "onePair",
      card: "as",
    });

    assert.deepEqual(getHandType(["two", "three", "ten", "six", "four"]), {
      level: "highCard",
    });
  });
});

await describe("getHandTypeJoker", async () => {
  await it("generates the best hand type", () => {
    assert.deepEqual(
      getHandTypeJoker(["jack", "king", "king", "king", "two"]),
      {
        level: "fourOfAKind",
        card: "king",
      },
    );
  });
});

await describe("day 7 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 6440);
  });
});

await describe("day 7 - part 2", async () => {
  await it("should work with the example", () => {
    assert.equal(part2(example), 5905);
  });
});
