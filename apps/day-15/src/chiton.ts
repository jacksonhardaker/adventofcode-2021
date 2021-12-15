type PossiblyNode = Node | null;
type Y = number;
type X = number;
type Coords = [Y, X];
type Key = `${Y},${X}`;
type Cave = Map<Key, Node>;
class Node {
  value: number;
  key: Key;
  up: PossiblyNode;
  down: PossiblyNode;
  left: PossiblyNode;
  right: PossiblyNode;
  isEnd: boolean;
  constructor(value: number, coords: Coords) {
    Object.assign(this, {
      value,
      isEnd: false,
      key: `${coords[0]},${coords[1]}`,
    });
  }

  setConnections(
    up: PossiblyNode,
    down: PossiblyNode,
    left: PossiblyNode,
    right: PossiblyNode
  ) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }
}

const key = (y: number, x: number): Key => `${y},${x}`;

const buildMap = (input: number[][]) => {
  const cave: Cave = new Map();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const node = cave.get(key(y, x)) || new Node(input[y][x], [y, x]);
      const up = cave.get(key(y - 1, x));
      const down = cave.get(key(y + 1, x));
      const left = cave.get(key(y, x - 1));
      const right = cave.get(key(y, x + 1));

      node.setConnections(up, down, left, right);
      node.isEnd = y === input.length - 1 && x === input[y].length - 1;

      if (up) up.down = node;
      if (down) down.up = node;
      if (left) left.right = node;
      if (right) right.left = node;

      cave.set(node.key, node);
    }
  }

  return cave;
};

const findPaths = (start: Node, cave: Cave) => {
  const unvisited = new Set(cave.values());
  const tentatives = Array.from(cave.keys()).reduce((acc, key) => {
    acc.set(key, key === '0,0' ? 0 : Infinity);
    return acc;
  }, new Map<string, number>());
  const notInfinite = new Set<Node>();

  let current = start;
  while (current) {
    const changed = [];
    [current.up, current.down, current.left, current.right].forEach(
      (neighbor) => {
        if (unvisited.has(neighbor)) {
          const oldTentative = tentatives.get(neighbor.key);
          const newTentative = tentatives.get(current.key) + neighbor.value;
          tentatives.set(
            neighbor.key,
            newTentative < oldTentative ? newTentative : oldTentative
          );

          changed.push(neighbor);
          notInfinite.add(neighbor);
        }
      }
    );

    unvisited.delete(current);
    notInfinite.delete(current);

    if (current.isEnd) {
      break;
    }
    
    const thing = Array.from(notInfinite.values()).reduce((acc, node) => {
      if (!acc) return node;

      const nodeVal = tentatives.get(node.key);
      const accVal = tentatives.get(acc.key);

      return nodeVal < accVal ? node : acc;
    }, null);
    current = thing;
  }

  return Array.from(tentatives.values())[tentatives.size - 1];
};

export const chiton = (input: number[][]) => {
  const cave = buildMap(input);
  return findPaths(cave.get(key(0, 0)), cave);
};

export const expandMap = (input: number[][]) => {
  const expandedRows: number[][] = [];

  for (let i = 0; i < 5; i++) {
    for (let y = 0; y < input.length; y++) {
      let newRow = [];
      for (let j = 0; j < 5; j++) {
        newRow = [
          ...newRow,
          ...input[y].map((val) =>
            val + i + j >= 10 ? val + i + j - 9 : val + i + j
          ),
        ];
      }
      expandedRows.push(newRow);
    }
  }
  return expandedRows;
};
