import { binaryDiagnostic } from './binaryDiagnostic';

describe('binaryDiagnostic', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = binaryDiagnostic(input);

    expect(result).toEqual(null);
  });
});
