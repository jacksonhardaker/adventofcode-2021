export const parseInput = (
  input: string[]
): [string, Record<string, string>] => [
  input[0],
  input[1].split('\n').reduce((acc, instruction) => {
    const [key, val] = instruction.split(' -> ');
    return { ...acc, [key]: val };
  }, {} as Record<string, string>),
];

export const extendedPolymerization = (input: string[], steps = 10) => {
  const [start, instructions] = parseInput(input);
  let pairs = Array.from(
    start.matchAll(RegExp(`(?=(${Object.keys(instructions).join('|')}))`, 'g'))
  ).reduce((acc, [_, pair]) => ({ ...acc, [pair]: 1 }), {});
  let tail = start.slice(-2);

  let aggregate: Record<string, number> = {};

  for (let i = 0; i < steps; i++) {
    aggregate = {};
    let newTail;
    pairs = Object.entries(pairs).reduce(
      (acc, [pair, count]: [string, number]) => {
        const char = instructions[pair];
        if (char) {
          const key1 = `${pair[0]}${char}`;
          const key2 = `${char}${pair[1]}`;

          if (pair === tail) {
            newTail = key2;
          }

          aggregate[key1[0]] = (aggregate[key1[0]] || 0) + count;
          aggregate[key2[0]] = (aggregate[key2[0]] || 0) + count;

          return {
            ...acc,
            [key1]: (acc[key1] || 0) + count,
            [key2]: (acc[key2] || 0) + count,
          };
        }
      },
      {}
    );
    tail = newTail;
  }

  aggregate[tail[1]] = aggregate[tail[1]] + 1;

  const ordered = Object.values(aggregate).sort((a, b) =>
    a === b ? 0 : a > b ? 1 : -1
  );

  return ordered[ordered.length - 1] - ordered[0];
};

// {
//   CH: 586,
//   HH: 993,
//   HK: 744,
//   KH: 497,
//   HO: 579,
//   OK: 628,
//   KS: 518,
//   SH: 553,
//   HF: 400,
//   FO: 426,
//   OB: 800,
//   BK: 756,
//   KK: 448,
//   KF: 245,
//   FH: 222,
//   BB: 949,
//   KO: 312,
//   KN: 290,
//   NF: 136,
//   FB: 233,
//   BH: 572,
//   HB: 899,
//   KC: 142,
//   CO: 142,
//   KP: 421,
//   PN: 264,
//   NO: 271,
//   OF: 149,
//   BO: 399,
//   OH: 336,
//   KV: 74,
//   VC: 155,
//   CK: 74,
//   NB: 66,
//   PK: 127,
//   NV: 143,
//   CC: 153,
//   CS: 279,
//   SO: 196,
//   OO: 177,
//   OC: 372,
//   BV: 157,
//   VN: 203,
//   NS: 173,
//   BN: 248,
//   VK: 71,
//   NC: 186,
//   SF: 105,
//   PB: 149,
//   FC: 46,
//   HC: 81,
//   SB: 119,
//   CV: 99,
//   NK: 58,
//   SV: 40,
//   FK: 41,
//   VP: 122,
//   PC: 124,
//   HV: 46,
//   VF: 56,
//   FP: 56,
//   BC: 73,
//   FV: 17,
//   PS: 17,
//   FF: 41,
//   FS: 74,
//   SC: 16,
//   CP: 16,
//   OP: 41,
//   PV: 33,
//   BP: 61,
//   PF: 33,
//   SP: 33,
//   PH: 15,
//   HP: 12,
//   VS: 1,
//   VV: 1,
//   VB: 1,
//   HN: 19,
//   NN: 13,
//   FN: 9
// }
