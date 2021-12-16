import { packetDecoder } from './packetDecoder';

describe('packetDecoder', () => {
  test('should return the expected result', () => {
    const input = [];
    const result = packetDecoder(input);

    expect(result).toEqual(null);
  });
});
