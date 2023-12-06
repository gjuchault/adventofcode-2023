import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { calculateDistance, part1, part2 } from "../index.js";
import { example } from "../input.js";

await describe("calculateDistance", async () => {
  await it("should work with the example", () => {
    assert.equal(calculateDistance(0, 7), 0);
    assert.equal(calculateDistance(1, 7), 6);
    assert.equal(calculateDistance(2, 7), 10);
    assert.equal(calculateDistance(3, 7), 12);
    assert.equal(calculateDistance(4, 7), 12);
    assert.equal(calculateDistance(5, 7), 10);
    assert.equal(calculateDistance(6, 7), 6);
    assert.equal(calculateDistance(7, 7), 0);
  });
});

await describe("day 6 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 288);
  });
});

await describe("day 6 - part 2", async () => {
  await it("should work with the example", () => {
    assert.equal(part2(example), 456);
  });
});
