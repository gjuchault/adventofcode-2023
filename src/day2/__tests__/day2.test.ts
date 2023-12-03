import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { part1, part2 } from "../index.js";
import { example } from "../input.js";

await describe("day 2 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 8);
  });
});

await describe("day 2 - part 2", async () => {
  await it("should work with the example", () => {
    assert.equal(part2(example), 2286);
  });
});
