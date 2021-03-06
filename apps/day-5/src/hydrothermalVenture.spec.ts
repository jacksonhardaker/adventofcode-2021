import { hydrothermalVenture } from './hydrothermalVenture';

describe('hydrothermalVenture', () => {
  test('should return the expected result of 5 when ignoring diagonals', () => {
    const input = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2',
    ];
    const result = hydrothermalVenture(input);

    expect(result).toEqual(5);
  });

  test('should return the expected result of 12 when NOT ignoring diagonals', () => {
    const input = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2',
    ];
    const result = hydrothermalVenture(input, true);

    expect(result).toEqual(12);
  });
});
