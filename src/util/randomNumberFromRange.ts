/**
 * @param min Inclusive
 * @param max Inclusive
 * @returns Random integer from min to max
 */
export const randomNumberFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
