import { sevenSegmentSearch } from './sevenSegmentSearch';

describe('sevenSegmentSearch', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = sevenSegmentSearch(input);

    expect(result).toEqual(null);
  });
});
