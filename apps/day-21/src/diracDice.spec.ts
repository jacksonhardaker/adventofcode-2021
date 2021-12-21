import { diracDice } from './diracDice';

describe('diracDice', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = diracDice(input);

    expect(result).toEqual(null);
  });
});
