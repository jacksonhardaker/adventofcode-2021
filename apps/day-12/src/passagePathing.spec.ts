import { passagePathing } from './passagePathing';

describe('passagePathing', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = passagePathing(input);

    expect(result).toEqual(null);
  });
});
