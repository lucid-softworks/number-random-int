export type RandomSource = () => number;

/** Return an integer in the half-open interval `[minimum, maximum)`. */
export function randomInt(
  minimum: number,
  maximum: number,
  random: RandomSource = Math.random,
): number {
  if (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum)) {
    throw new RangeError("bounds must be safe integers");
  }

  if (maximum <= minimum) {
    throw new RangeError("maximum must be greater than minimum");
  }

  const sample = random();

  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
    throw new RangeError("random source must return a number in [0, 1)");
  }

  return minimum + Math.floor(sample * (maximum - minimum));
}
