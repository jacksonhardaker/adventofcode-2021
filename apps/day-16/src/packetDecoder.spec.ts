import { packetDecoder } from './packetDecoder';

describe('packetDecoder', () => {
  test.each([
    ['EE00D40C823060', 14]
    // ['8A004A801A8002F478', 16],
    // ['620080001611562C8802118E34', 12],
    // ['C0015000016115A2E0802F182340', 23],
    // ['A0016C880162017C3686B18A3D4780', 32],
  ])('should return the expected result', (input, expected) => {
    expect(packetDecoder(input)).toEqual(expected);
  });
});
