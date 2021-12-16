import {
  sumOfVersions,
  parseBinary,
  hexToBinary,
  evalPackets,
  packetDecoder,
} from './packetDecoder';

describe('hexToBinary', () => {
  test('should parse the hex code to the correct binary', () => {
    expect(hexToBinary('D2FE28')).toEqual('110100101111111000101000');
  });
});

describe('parseBinary', () => {
  test('should parse the given binary input', () => {
    const binary = [
      '1',
      '1',
      '1',
      '0',
      '1',
      '1',
      '1',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '1',
      '1',
      '0',
      '1',
      '0',
      '1',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '1',
      '1',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '0',
      '0',
      '1',
      '0',
      '0',
      '0',
      '1',
      '1',
      '0',
      '0',
      '0',
      '0',
      '0',
      '1',
      '1',
      '0',
      '0',
      '0',
      '0',
      '0',
    ];

    const parsed = parseBinary(binary);

    // The three bits labeled V (111) are the packet version, 7.
    expect(parsed[0].version).toEqual(7);
    // The three bits labeled T (011) are the packet type ID, 3, which means the packet is an operator.
    expect(parsed[0].typeId).toEqual(3);
    // The bit labeled I (1) is the length type ID, which indicates that the length is a 11-bit number representing the number of sub-packets.
    // The 11 bits labeled L (00000000011) contain the number of sub-packets, 3.
    expect(parsed[0].subPacketCount).toEqual(3);
    // The 11 bits labeled A contain the first sub-packet, a literal value representing the number 1.
    expect(parsed[0].subPackets[0].value).toEqual(1);
    // The 11 bits labeled B contain the second sub-packet, a literal value representing the number 2.
    expect(parsed[0].subPackets[1].value).toEqual(2);
    // The 11 bits labeled C contain the third sub-packet, a literal value representing the number 3.
    expect(parsed[0].subPackets[2].value).toEqual(3);
  });
});

describe('sumOfVersions', () => {
  test.each([
    ['EE00D40C823060', 14],
    ['8A004A801A8002F478', 16],
    ['620080001611562C8802118E34', 12],
    ['C0015000016115A2E0802F182340', 23],
    ['A0016C880162017C3686B18A3D4780', 31],
  ])('should return the expected result', (input, expected) => {
    expect(sumOfVersions(packetDecoder(input))).toEqual(expected);
  });
});

describe('evalPackets', () => {
  test.each([
    { input: 'C200B40A82', expected: 3 },
    { input: '04005AC33890', expected: 54 },
    { input: '880086C3E88112', expected: 7 },
    { input: 'CE00C43D881120', expected: 9 },
    // { input: 'D8005AC2A8F0', expected: 1 },
    // { input: 'F600BC2D8F', expected: 0 },
    // { input: '9C005AC2F8F0', expected: 0 },
    // { input: '9C0141080250320F1802104A08', expected: 1 },
  ])(
    'should return the value ($expected) of the outermost packet after operators have evaluated',
    ({ input, expected }) => {
      expect(evalPackets(input)).toEqual(expected);
    }
  );
});
