class ListNode {
  value: string;
  next: ListNode | null;
  previous: ListNode | null;
  constructor(
    value: string,
    previous: ListNode | null = null,
    next: ListNode | null = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString() {
    let next = this.next;
    let result = this.value;
    while (next) {
      result += next.value;
      next = next.next;
    }
    return result;
  }
}

export const parseInput = (
  input: string[]
): [string, Record<string, string>] => [
  input[0],
  input[1].split('\n').reduce((acc, instruction) => {
    const [key, val] = instruction.split(' -> ');
    return { ...acc, [key]: val };
  }, {} as Record<string, string>),
];

const buildPolymerList = (polymer: string) =>
  Array.from(polymer).reduce((acc, letter) => {
    const previous = acc[acc.length - 1] || null;
    const node = new ListNode(letter, previous);

    if (previous) {
      previous.next = node;
    }
    return [...acc, node];
  }, []);

export const buildPolymer = (input: string[], steps = 10) => {
  const [start, instructions] = parseInput(input);
  let polymer = start;

  for (let i = 0; i < steps; i++) {
    const nodes = buildPolymerList(polymer);
    const pattern = RegExp(`(?=(${Object.keys(instructions).join('|')}))`, 'g');
    const matches = Array.from(polymer.matchAll(pattern));

    matches.forEach((match) => {
      const instruction = instructions[match[1]];
      const node = new ListNode(instruction, nodes[match.index], nodes[match.index + 1]);
      nodes[match.index].next.previous = node;
      nodes[match.index].next = node;
    });

    polymer = nodes[0].toString();
  }

  const thing = Array.from(
    polymer.matchAll(RegExp(`(?=(${Object.keys(instructions).join('|')}))`, 'g'))
  ).reduce((acc, [_, pair]) => ({ ...acc, [pair]: acc[pair] ? acc[pair] + 1 : 1 }), {});

  // console.log(thing);

  return polymer;
};

export const extendedPolymerization = (input: string[], steps = 10) => {
  const polymer = buildPolymer(input, steps);

  const letterMap = Array.from(polymer).reduce((acc, value) => {
    return {
      ...acc,
      [value]: acc[value] ? acc[value] + 1 : 1,
    };
  }, {} as Record<string, number>);

  const counts = Object.values(letterMap).sort((a, b) =>
    a === b ? 0 : a > b ? 1 : -1
  );

  return counts[counts.length - 1] - counts[0];
};

// {
//   CH: 624,
//   HH: 1035,
//   HK: 780,
//   KH: 516,
//   HO: 606,
//   OK: 661,
//   KS: 534,
//   SH: 575,
//   HF: 426,
//   FO: 456,
//   OB: 839,
//   BK: 799,
//   KK: 470,
//   KF: 263,
//   FH: 232,
//   BB: 1000,
//   KO: 330,
//   KN: 305,
//   NF: 143,
//   FB: 252,
//   BH: 601,
//   HB: 932,
//   KC: 147,
//   CO: 147,
//   KP: 458,
//   PN: 289,
//   NO: 287,
//   OF: 161,
//   BO: 420,
//   OH: 351,
//   KV: 79,
//   VC: 164,
//   CK: 79,
//   NB: 71,
//   PK: 136,
//   NV: 148,
//   CC: 166,
//   CS: 298,
//   SO: 205,
//   OO: 188,
//   OC: 394,
//   BV: 167,
//   VN: 216,
//   NS: 184,
//   BN: 256,
//   VK: 71,
//   NC: 198,
//   SF: 113,
//   PB: 163,
//   FC: 51,
//   HC: 88,
//   SB: 129,
//   CV: 106,
//   NK: 63,
//   SV: 41,
//   FK: 43,
//   VP: 130,
//   PC: 133,
//   HV: 50,
//   VF: 60,
//   FP: 60,
//   BC: 78,
//   FV: 18,
//   PS: 19,
//   FF: 45,
//   FS: 81,
//   SC: 18,
//   CP: 18,
//   OP: 45,
//   PV: 34,
//   BP: 66,
//   PF: 36,
//   SP: 36,
//   PH: 16,
//   HP: 13,
//   VS: 1,
//   VV: 1,
//   VB: 1,
//   HN: 19,
//   NN: 13,
//   FN: 9
// }
