/**
 * @param min Inclusive
 * @param max Inclusive
 * @returns Random integer from min to max
 */
export const randomNumberFromRange = (min: number, max: number) => {
  if (min >= max) {
    throw new Error(
      'The first argument must be less than the second argument.'
    );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
