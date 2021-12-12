class Cave {
  name: string;
  connections: Map<string, Cave>;
  size: 'small' | 'large';
  isSmall: boolean;
  constructor(name: string) {
    this.name = name;
    this.connections = new Map();
    this.isSmall = name === name.toLowerCase();
  }

  push(cave: Cave) {
    this.connections.set(cave.name, cave);
  }
}

const mapCave = (input: string[]) =>
  input.reduce((tree, path) => {
    const [from, to] = path.split('-');

    const fromCave = tree.get(from) || tree.set(from, new Cave(from)).get(from);
    const toCave = tree.get(to) || tree.set(to, new Cave(to)).get(to);

    fromCave.push(toCave);
    toCave.push(fromCave);

    return tree;
  }, new Map<string, Cave>());

const traverse = (useExpandedRules = false, start: Cave) => {
  const ends: Cave[][] = [];

  const step = (cave: Cave, path: Cave[]) => {
    if (cave.name === 'end') return ends.push([...path, cave]);

    const hasVisited = (c1) => !!path.find((c2) => c2.name === c1.name);

    const continueAfterApplyingRules = () => {
      const hasAlreadyVisitedTwoSmallCaves = path.some(
        (cave, index) => path.indexOf(cave) !== index
      );
      const isSmallAndHasBeenVisited = cave.isSmall && hasVisited(cave)

      return useExpandedRules ? !(hasAlreadyVisitedTwoSmallCaves && isSmallAndHasBeenVisited) : !isSmallAndHasBeenVisited;
    };

    if (continueAfterApplyingRules()) {
      path.push(cave);
      cave.connections.forEach((child) => {
        if (child.name !== 'start') step(child, [...path]);
      });
    }
  };

  step(start, []);

  return ends;
};

export const passagePathing = (input: string[]) =>
  traverse(false, mapCave(input).get('start'));

export const passagePathing2 = (input: string[]) =>
  traverse(true, mapCave(input).get('start'));
