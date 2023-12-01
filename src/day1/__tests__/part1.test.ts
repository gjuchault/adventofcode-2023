import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { part1 } from "../index.js";
import { example } from "../input.js";

await describe("day 1 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 142);
  });
});