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
  ).reduce((acc, [_, pair]) => ({ ...acc, [pair]: (acc[pair] || 0) + 1 }), {});
  let tail = start.slice(-2);
  let aggregate: Record<string, number> = {};

  for (let i = 0; i < steps; i++) {
    aggregate = {};
    let newTail;
    pairs = Object.entries(pairs).reduce(
      (acc, [pair, count]: [string, number]) => {
        const char = instructions[pair];
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
