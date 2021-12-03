import { binaryDiagnostic } from './binaryDiagnostic';

describe('binaryDiagnostic', () => {
  test('should return the expected result', () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010',
    ];
    const result = binaryDiagnostic(input);

    expect(result).toEqual(198);
  });
});
