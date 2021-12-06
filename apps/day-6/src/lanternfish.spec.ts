import { lanternfish } from './lanternfish';

describe('lanternfish', () => {
  const input = [3, 4, 3, 1, 2];

  test.each([
    [0, 5, input],
    [1, 5, input],
    [12, 17, input],
    [18, 26, input],
    [80, 5934, input],
    [256, 26984457539, input],
  ])(
    'after %i days should return %i fish with the given input',
    (days, expected, input) => {
      expect(lanternfish(input, days)).toEqual(expected);
    }
  );
});
