import { whaleTreachery } from './whaleTreachery';

describe('whaleTreachery', () => {
  test('should return the expected result with constant fuel usage', () => {
    const input = [16,1,2,0,4,2,7,1,2,14];
    const result = whaleTreachery(input);

    expect(result).toEqual(37);
  });

  test('should return the expected result with increasing fuel usage', () => {
    const input = [16,1,2,0,4,2,7,1,2,14];
    const result = whaleTreachery(input, false);

    expect(result).toEqual(168);
  });
});
