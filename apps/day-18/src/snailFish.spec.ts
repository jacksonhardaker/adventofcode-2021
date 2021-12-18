import { snailFish } from './snailFish';

describe('snailFish', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = snailFish(input);

    expect(result).toEqual(null);
  });
});
