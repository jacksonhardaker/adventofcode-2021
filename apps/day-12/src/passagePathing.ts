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

const traverse =
  (useExpandedRules = false) =>
  (cave: Cave, path: Cave[], ends: Cave[][]) => {
    const hasVisited = (name) => !!path.find((c) => c.name === name);

    if (useExpandedRules) {
      const isRevisitingStart = cave.name === 'start' && hasVisited('start');
      const hasAlreadyVisitedTwoSmallCaves = path.some(
        (cave, index) => path.indexOf(cave) !== index
      );

      if (
        isRevisitingStart ||
        (hasAlreadyVisitedTwoSmallCaves && hasVisited(cave.name))
      )
        return ends;
    } else {
      if (cave.isSmall && hasVisited(cave.name)) return ends;
    }

    path.push(cave);

    if (cave.name === 'end') {
      ends.push(path);
      return ends;
    } else {
      cave.connections.forEach((child) => {
        traverse(useExpandedRules)(child, [...path], ends);
      });
      return ends;
    }
  };

export const passagePathing = (input: string[]) =>
  traverse()(mapCave(input).get('start'), [], []);

export const passagePathing2 = (input: string[]) =>
  traverse(true)(mapCave(input).get('start'), [], []);
