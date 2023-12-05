import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { locationToSeed, part1, part2, seedToLocation } from "../index.js";
import { example } from "../input.js";
import { Game, parse } from "../parse.js";

await describe("seedToLocation", async () => {
  await it("given the example map", () => {
    const test = parse(example);

    const oneMapTest: Game = {
      ...test,
      maps: [test.maps[0]!],
    };

    assert.equal(seedToLocation(oneMapTest, 79), 81);
    assert.equal(seedToLocation(oneMapTest, 14), 14);
    assert.equal(seedToLocation(oneMapTest, 55), 57);
    assert.equal(seedToLocation(oneMapTest, 13), 13);
  });
});

await describe("locationToSeed", async () => {
  await it("given the example map", () => {
    const test = parse(example);

    const oneMapTest: Game = {
      ...test,
      maps: [test.maps[0]!],
    };

    assert.equal(locationToSeed(oneMapTest, 81), 79);
    assert.equal(locationToSeed(oneMapTest, 14), 14);
    assert.equal(locationToSeed(oneMapTest, 57), 55);
    assert.equal(locationToSeed(oneMapTest, 13), 13);
  });
});

await describe("day 5 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 35);
  });
});

await describe("day 5 - part 2", async () => {
  await it("should work with the example", () => {
    assert.equal(part2(example), 46);
  });
});
