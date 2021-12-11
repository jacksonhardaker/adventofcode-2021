import { dumbOctopus } from './dumbOctopus';

describe('dumbOctopus', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = dumbOctopus(input);

    expect(result).toEqual(null);
  });
});
