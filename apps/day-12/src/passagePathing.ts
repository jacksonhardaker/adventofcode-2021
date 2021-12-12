class TreeNode {
  cave: Cave;
  parent: TreeNode | null;
  constructor(cave, parent) {
    this.cave = cave;
    this.parent = parent;
  }
}
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
      const hasAlreadyVisitedTwoSmallCaves = path.some(
        (cave, index) => path.indexOf(cave) !== index
      );

      if (
        hasAlreadyVisitedTwoSmallCaves &&
        cave.isSmall &&
        hasVisited(cave.name)
      ) {
        return ends;
      }
    } else {
      if (cave.isSmall && hasVisited(cave.name)) return ends;
    }

    path.push(cave);

    if (cave.name === 'end') {
      ends.push(path);
      return ends;
    } else {
      cave.connections.forEach((child) => {
        if (child.name !== 'start')
          traverse(useExpandedRules)(child, [...path], ends);
      });
      return ends;
    }
  };

const traverse2 = (useExpandedRules = false, start: Cave) => {
  const ends: TreeNode[] = [];
  const visited = new Map<string, Cave>();

  const step = (cave: Cave, parent: TreeNode) => {
    const node = new TreeNode(cave, parent);
    if (cave.name === 'end') return ends.push(node);

    if (useExpandedRules) {
      console.log('expanded');
    } else {
      if (cave.isSmall && visited.get(cave.name)) return;
    }

    visited.set(cave.name, cave);

    cave.connections.forEach((connection) => {
      connection.name !== 'start' && step(connection, node);
    });
  };

  step(start, null);
  console.log(ends);
  return ends;
};

// export const passagePathing = (input: string[]) =>
//   traverse()(mapCave(input).get('start'), [], []);
export const passagePathing = (input: string[]) =>
  traverse2(false, mapCave(input).get('start'));

export const passagePathing2 = (input: string[]) =>
  traverse(true)(mapCave(input).get('start'), [], []);
