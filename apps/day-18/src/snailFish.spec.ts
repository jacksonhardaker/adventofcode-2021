import { snailFish, explode, parseNumber } from './snailFish';

describe('explode', () => {
  test.each([
    [
      [[[[[9, 8], 1], 2], 3], 4],
      [[[[0, 9], 2], 3], 4],
    ] as Array<(number | number[])[]>,
  ])('should explode the snailnumber as expected', (input, expected) => {
    const result = explode(parseNumber(input));
    console.log(JSON.stringify(result.root.toArray()));
    expect(result.root.toArray()).toEqual(expected);
  });
});

describe('snailFish', () => {
  test('should return the expected result', () => {
    const input = [[[[[9, 8], 1], 2], 3], 4];
    const result = snailFish(input);

    expect(result).toEqual(null);
  });
});
