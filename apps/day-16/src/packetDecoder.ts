type PacketType = 'operator' | 'literal';
type Packet = {
  version: number;
  typeId: number;
  lengthTypeId?: 0 | 1;
  totalSubPacketLength?: number; // if length type id is 0
  subPacketCount?: number; // if length type id is 1
  literalValue?: number; // if type id is 4
  subPackets: Packet[];
};

const LITERAL_TYPE = 4;
const OPERATOR_TYPE_NEXT = {
  0: 15,
  1: 11,
};

const parseBinary = (binary: string[]) => {
  const packets = [];

  const chomp = (length) => parseInt(binary.splice(0, length).join(''), 2);
  const chompPacket = (parent?: Packet) => {
    const packet: Packet = {
      version: chomp(3),
      typeId: chomp(3),
      subPackets: [],
    };

    if (packet.typeId !== LITERAL_TYPE) {
      packet.lengthTypeId = chomp(1) as 0 | 1;

      if (packet.lengthTypeId == 0) {
        packet.totalSubPacketLength = chomp(OPERATOR_TYPE_NEXT[0]);
      } else if (packet.lengthTypeId == 1) {
        packet.subPacketCount = chomp(OPERATOR_TYPE_NEXT[1]);
      }
    } else {
      let isLastGroup = false;
      const num = [];
      while (!isLastGroup) {
        isLastGroup = chomp(1) == 0;
        num.push(chomp(4));
      }
      packet.literalValue = parseInt(num.join(''), 2);
    }
    parent ? parent.subPackets.push(packet) : packets.push(packet);
    return packet;
  };

  const packet = chompPacket();
  if (packet.typeId !== LITERAL_TYPE && packet.lengthTypeId == 0) {
    parseBinary(binary.splice(0, packet.totalSubPacketLength));
  } else if (packet.typeId !== LITERAL_TYPE && packet.lengthTypeId == 1) {
    packet.subPackets = Array(packet.totalSubPacketLength)
      .fill(0)
      .map(() => chompPacket(packet));
  }

  return packets;
};

export const packetDecoder = (input: string) => {
  const binary = Array.from(parseInt(input, 16).toString(2));

  // }
  const packets = parseBinary(binary);

  console.log(packets);

  // console.log(chompPacket());
  // console.log(binary);

  return null;
};
