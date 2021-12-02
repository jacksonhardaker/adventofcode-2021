import { dive } from './dive';

describe('dive', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = dive(input);

    expect(result).toEqual(null);
  });
});
