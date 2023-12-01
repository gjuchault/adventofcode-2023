import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

await describe("foobar()", async () => {
  await describe("given two positive integers", async () => {
    const one = 1;
    const two = 2;

    await describe("when called", async () => {
      await it("returns the sum of them multiplied by 3", () => {
        assert.equal(one + two, 3);
      });
    });
  });
});
