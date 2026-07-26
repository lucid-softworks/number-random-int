import { describe, expect, it } from "vitest";

import { randomInt } from "../src/index.js";

describe("randomInt", () => {
  it("maps injected samples into a half-open integer range", () => {
    expect(randomInt(2, 5, () => 0)).toBe(2);
    expect(randomInt(2, 5, () => 0.999_999)).toBe(4);
  });

  it("uses Math.random by default", () => {
    expect(randomInt(0, 1)).toBe(0);
  });

  it.each([
    [1.5, 2],
    [1, 2.5],
    [Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 2],
  ])("rejects unsafe bounds", (minimum, maximum) => {
    expect(() => randomInt(minimum, maximum)).toThrow(
      new RangeError("bounds must be safe integers"),
    );
  });

  it.each([
    [1, 1],
    [2, 1],
  ])("rejects empty or reversed ranges", (minimum, maximum) => {
    expect(() => randomInt(minimum, maximum)).toThrow(
      new RangeError("maximum must be greater than minimum"),
    );
  });

  it.each([-0.1, 1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects source result %s",
    (sample) => {
      expect(() => randomInt(0, 10, () => sample)).toThrow(
        new RangeError("random source must return a number in [0, 1)"),
      );
    },
  );
});
