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

    const continueAfterApplyingRules = () => {
      const hasAlreadyVisitedTwoSmallCaves = path.some(
        (cave, index) => cave.isSmall && path.indexOf(cave) !== index
      );
      const isSmallAndHasBeenVisited =
        cave.isSmall && !!path.find((c) => c.name === cave.name);

      return useExpandedRules
        ? !(hasAlreadyVisitedTwoSmallCaves && isSmallAndHasBeenVisited)
        : !isSmallAndHasBeenVisited;
    };

    if (continueAfterApplyingRules()) {
      cave.connections.forEach((connection) => {
        if (connection.name !== 'start') step(connection, [...path, cave]);
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
