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

const traverse = (cave: Cave, path: Cave[], ends: Cave[][]) => {
  if (cave.isSmall && path.find((c) => c.name === cave.name)) return;
  
  path.push(cave);

  if (cave.name === 'end') {
    ends.push(path);
    return;
  }
  else {
    cave.connections.forEach((child) => {
      traverse(child, [...path], ends);
    });
    return;
  }
};

export const passagePathing = (input: string[]) => {
  const caveSystem = mapCave(input);

  const start = caveSystem.get('start');
  const ends = [];
  traverse(start, [], ends);

  return ends;
};
