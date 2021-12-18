import { snailFish, explode, parseNumber } from './snailFish';

describe('explode', () => {
  test.each([
    [
      [[[[[9, 8], 1], 2], 3], 4],
      [[[[0, 9], 2], 3], 4],
    ],
    [
      [7, [6, [5, [4, [3, 2]]]]],
      [7, [6, [5, [7, 0]]]],
    ],
    [
      [[6, [5, [4, [3, 2]]]], 1],
      [[6, [5, [7, 0]]], 3],
    ],
    [
      [3, [2, [1, [7, 3]]]],
      [6, [5, [4, [3, 2]]]],
    ],
    [
      [3, [2, [8, 0]]],
      [9, [5, [4, [3, 2]]]],
    ],
    [
      [
        [3, [2, [8, 0]]],
        [9, [5, [4, [3, 2]]]],
      ],
      [
        [3, [2, [8, 0]]],
        [9, [5, [7, 0]]],
      ],
    ],
  ] as (number | number[])[][][])(
    'should explode the snailnumber as expected',
    (input, expected) => {
      const result = explode(parseNumber(input));
      expect(result.root.toArray()).toEqual(expected);
    }
  );
});

describe('snailFish', () => {
  test('should return the expected result', () => {
    const input = [[[[[9, 8], 1], 2], 3], 4];
    const result = snailFish(input);

    expect(result).toEqual(null);
  });
});
