type Packet = {
  version: number;
  typeId: number;
  lengthTypeId?: 0 | 1;
  totalSubPacketLength?: number; // if length type id is 0
  subPacketCount?: number; // if length type id is 1
  literalValue?: number; // if type id is 4
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

    if (packet.typeId !== TypeID.literal) {
      packet.lengthTypeId = chomp(1) as 0 | 1;

      if (packet.lengthTypeId == 0) {
        packet.totalSubPacketLength = chomp(LengthTypeId[0]);
      } else if (packet.lengthTypeId == 1) {
        packet.subPacketCount = chomp(LengthTypeId[1]);
      }
    } else {
      let isLastGroup = false;
      const num = [];
      while (!isLastGroup) {
        isLastGroup = chomp(1) == 0;
        num.push(chompWithoutParse(4));
      }
      packet.literalValue = parseInt(num.join(''), 2);
    }
    parent ? parent.subPackets.push(packet) : packets.push(packet);

    if (packet.typeId !== TypeID.literal && packet.lengthTypeId == 0) {
      packet.subPackets = parseBinary(
        binary.splice(0, packet.totalSubPacketLength)
      );
    } else if (packet.typeId !== TypeID.literal && packet.lengthTypeId == 1) {
      packet.subPackets = Array(packet.subPacketCount)
        .fill(0)
        .map(() => chompPacket(packet));
    }

    return packet;
  };

  while (binary.length > 0) {
    chompPacket();
  }

  return packets;
};

export const packetDecoder = (input: string) => {
  const binary = Array.from(hexToBinary(input));
  const packets = parseBinary(binary);

  const sumVersionNumbers = (packets: Packet[]) =>
    packets.reduce((acc, packet) => {
      const subPacketsSum =
        packet.subPackets.length > 0 ? sumVersionNumbers(packet.subPackets) : 0;
      return acc + packet.version + subPacketsSum;
    }, 0);

  // console.log(JSON.stringify(packets, null, 2));

  return sumVersionNumbers(packets);
};
