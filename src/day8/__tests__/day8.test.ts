import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { part1, part2 } from "../index.js";
import { example, example2 } from "../input.js";

await describe("day 8 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 2);
    assert.equal(part1(example2), 6);
  });
});

await describe("day 8 - part 2", async () => {
  await it("should work with the example", () => {
    assert.equal(part2(example), 456);
  });
});
