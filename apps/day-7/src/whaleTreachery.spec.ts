import { whaleTreachery } from './whaleTreachery';

describe('whaleTreachery', () => {
  test('should return the expected result', () => {
    const input = [16,1,2,0,4,2,7,1,2,14];
    const result = whaleTreachery(input);

    expect(result).toEqual(37);
  });
});
