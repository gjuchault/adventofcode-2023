import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { part1, part2, resolveMap } from "../index.js";
import { example } from "../input.js";
import { parse } from "../parse.js";

await describe("resolveMap", async () => {
  await it("given the example map", () => {
    const test = parse(example);

    assert.equal(resolveMap(test.maps[0]!, 79), 81);
    assert.equal(resolveMap(test.maps[0]!, 14), 14);
    assert.equal(resolveMap(test.maps[0]!, 55), 57);
    assert.equal(resolveMap(test.maps[0]!, 13), 13);
  });
});

await describe("day 5 - part 1", async () => {
  await it("should work with the example", () => {
    assert.equal(part1(example), 35);
  });
});

await describe("day 5 - part 2", async () => {
  await it("should work with the example", () => {
    assert.equal(part2(example), 456);
  });
});
