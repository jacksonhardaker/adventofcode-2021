import { extendedPolymerization } from './extendedPolymerization';

describe('extendedPolymerization', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = extendedPolymerization(input);

    expect(result).toEqual(null);
  });
});
