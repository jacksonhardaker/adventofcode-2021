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

    Array.from(polymer).forEach((val, i, arr) => {
      const pair = `${val}${arr[i + 1]}`;
      const instruction = instructions[pair];
      if (instruction) {
        const node = new ListNode(instruction, nodes[i], nodes[i + 1]);
        nodes[i].next = node;
        nodes[i + 1].previous = node;
      }
    });

    polymer = nodes[0].toString();
  }

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
