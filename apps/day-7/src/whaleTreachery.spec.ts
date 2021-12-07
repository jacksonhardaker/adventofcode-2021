import { whaleTreachery } from './whaleTreachery';

describe('whaleTreachery', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = whaleTreachery(input);

    expect(result).toEqual(null);
  });
});
