import { transparentOrigami } from './transparentOrigami';

describe('transparentOrigami', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = transparentOrigami(input);

    expect(result).toEqual(null);
  });
});
