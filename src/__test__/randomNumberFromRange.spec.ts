import { randomNumberFromRange } from '../util/randomNumberFromRange';

describe('randomNumberFromRange', () => {
  it('should always return a number between the arguments inclusive', () => {
    for (let i = 0; i < 20; i++) {
      const between1and10 = randomNumberFromRange(1, 10);

      expect(between1and10).toBeLessThanOrEqual(10);
      expect(between1and10).toBeGreaterThanOrEqual(1);
    }

    for (let i = 0; i < 200; i++) {
      const between11and100 = randomNumberFromRange(11, 100);

      expect(between11and100).toBeLessThanOrEqual(100);
      expect(between11and100).toBeGreaterThanOrEqual(11);
    }
  });

  it('should throw when first argument is greater than second argument', () => {
    expect(() => randomNumberFromRange(70, 50)).toThrow();
  });

  it('should throw when arguments are equal', () => {
    expect(() => randomNumberFromRange(22, 22)).toThrow();
  });
});
