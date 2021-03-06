type Packet = {
  version: number;
  typeId: number;
  lengthTypeId?: 0 | 1;
  totalSubPacketLength?: number; // if length type id is 0
  subPacketCount?: number; // if length type id is 1
  value?: number; // if type id is 4
  subPackets: Packet[];
};

enum TypeID {
  sum = 0,
  product = 1,
  minimum = 2,
  maximum = 3,
  literal = 4,
  greaterThan = 5,
  lessthan = 6,
  equalTo = 7,
}

const LengthTypeId = {
  0: 15,
  1: 11,
} as const;

export const hexToBinary = (input: string) => {
  return Array.from(input).reduce(
    (acc, hex) => acc + ('0000' + parseInt(hex, 16).toString(2)).slice(-4),
    ''
  );
};

export const parseBinary = (binary: string[]): Packet[] => {
  const packets: Packet[] = [];

  const chomp = (length) => parseInt(binary.splice(0, length).join(''), 2);
  const chompWithoutParse = (length) => binary.splice(0, length).join('');
  const chompPacket = (parent?: Packet) => {
    const packet: Packet = {
      version: chomp(3),
      typeId: chomp(3),
      subPackets: [],
    };

    const parseOperator = () => {
      packet.lengthTypeId = chomp(1) as 0 | 1;

      if (packet.lengthTypeId == 0) {
        packet.totalSubPacketLength = chomp(LengthTypeId[0]);
        packet.subPackets = parseBinary(
          binary.splice(0, packet.totalSubPacketLength)
        );
      } else if (packet.lengthTypeId == 1) {
        packet.subPacketCount = chomp(LengthTypeId[1]);
        packet.subPackets = Array(packet.subPacketCount)
          .fill(0)
          .map(() => chompPacket(packet));
      }
    };

    switch (packet.typeId) {
      case TypeID.sum:
        {
          parseOperator();
          packet.value =
            packet.subPackets.length === 1
              ? packet.subPackets[0].value
              : packet.subPackets.reduce((acc, sub) => acc + sub.value, 0);
        }
        break;
      case TypeID.product:
        {
          parseOperator();
          packet.value =
            packet.subPackets.length === 1
              ? packet.subPackets[0].value
              : packet.subPackets.reduce((acc, sub) => acc * sub.value, 1);
        }
        break;
      case TypeID.minimum:
        {
          parseOperator();
          packet.value = Math.min(...packet.subPackets.map((sub) => sub.value));
        }
        break;
      case TypeID.maximum:
        {
          parseOperator();
          packet.value = Math.max(...packet.subPackets.map((sub) => sub.value));
        }
        break;
      case TypeID.literal:
        {
          let isLastGroup = false;
          const num = [];
          while (!isLastGroup) {
            isLastGroup = chomp(1) == 0;
            num.push(chompWithoutParse(4));
          }
          packet.value = parseInt(num.join(''), 2);
        }
        break;
      case TypeID.greaterThan:
        {
          parseOperator();
          packet.value =
            packet.subPackets[0].value > packet.subPackets[1].value ? 1 : 0;
        }
        break;
      case TypeID.lessthan:
        {
          parseOperator();
          packet.value =
            packet.subPackets[0].value < packet.subPackets[1].value ? 1 : 0;
        }
        break;
      case TypeID.equalTo:
        {
          parseOperator();
          packet.value =
            packet.subPackets[0].value === packet.subPackets[1].value ? 1 : 0;
        }
        break;
      default:
        {
          parseOperator();
        }
        break;
    }

    parent ? parent.subPackets.push(packet) : packets.push(packet);
    return packet;
  };

  while (binary.length > 0) {
    chompPacket();
  }

  return packets;
};

export const packetDecoder = (input: string) => {
  const binary = Array.from(hexToBinary(input));
  return parseBinary(binary);
};

export const sumOfVersions = (packets: Packet[]): number =>
  packets.reduce((acc, packet) => {
    const subPacketsSum =
      packet.subPackets.length > 0 ? sumOfVersions(packet.subPackets) : 0;
    return acc + packet.version + subPacketsSum;
  }, 0);

export const evalPackets = (input: string) => {
  const binary = Array.from(hexToBinary(input));
  const packets = parseBinary(binary);

  return packets[0].value;
};
