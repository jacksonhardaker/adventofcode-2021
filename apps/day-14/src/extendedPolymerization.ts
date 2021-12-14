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

  toArray() {
    return this.next ? [this.value, ...this.next.toArray()] : [this.value];
  }
  toString() {
    return this.toArray().join('');
  }
}

export const parseInput = (input: string[]): [string, string[][]] => [
  input[0],
  input[1].split('\n').map((instruction) => instruction.split(' -> ')),
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
    const insertions = instructions.reduce((acc, [pair, letter]) => {
      const index = polymer.indexOf(pair);
      return index > -1
        ? [...acc, [nodes[index], nodes[index + 1], letter]]
        : acc;
    }, []);

    insertions.forEach(([prev, next, letter]) => {
      const node = new ListNode(letter, prev, next);
      prev.next = node;
      next.previous = node;
    });

    polymer = nodes[0].toString();
  }

  return polymer;
};

export const extendedPolymerization = (input: string[], steps = 10) => {
  return null;
};
