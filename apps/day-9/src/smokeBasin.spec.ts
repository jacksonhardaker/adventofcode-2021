import { smokeBasin } from './smokeBasin';

describe('smokeBasin', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = smokeBasin(input);

    expect(result).toEqual(null);
  });
});
