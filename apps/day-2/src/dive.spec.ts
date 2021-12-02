import { dive, Direction } from './dive';

describe('dive', () => {
  test('should return the expected result', () => {
    const input: Array<[Direction,number]> = [
      ['forward', 5],
      ['down', 5],
      ['forward', 8],
      ['up', 3],
      ['down', 8],
      ['forward', 2],
    ];
    const result = dive(input);

    expect(result).toEqual(150);
  });
});
