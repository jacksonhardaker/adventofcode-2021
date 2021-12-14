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

  for (let i = 0; i < steps; i++) {
    let newTail;
    pairs = Object.entries(pairs).reduce((acc, [pair, count]) => {
      if (instructions[pair]) {
        const key1 = `${pair.slice(0, 1)}${instructions[pair]}`;
        const key2 = `${instructions[pair]}${pair.slice(1, 2)}`;

        if (pair === tail) {
          newTail = key2;
        }

        return {
          ...acc,
          [key1]: acc[key1] ? acc[key1] + count : count,
          [key2]: acc[key2] ? acc[key2] + count : count,
        };
      } else {
        return {
          ...acc,
          [pair]: count,
        };
      }
    }, {});
    tail = newTail;
  }

  const aggregate = Object.entries(pairs).reduce(
    (acc: Record<string, number>, [pair, count]: [string, number]) => ({
      ...acc,
      [pair.slice(0, 1)]: acc[pair.slice(0, 1)]
        ? acc[pair.slice(0, 1)] + count
        : count,
    }),
    {}
  );

  aggregate[tail.slice(1, 2)] = aggregate[tail.slice(1, 2)]
    ? aggregate[tail.slice(1, 2)] + 1
    : 1;

  const ordered = Object.values(aggregate).sort((a, b) =>
    a === b ? 0 : a > b ? 1 : -1
  );

  return ordered[ordered.length - 1] - ordered[0];
};
