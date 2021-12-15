type PossiblyNode = Node | null;
type Y = number;
type X = number;
type Coords = [Y, X];
type Key = `${Y},${X}`;
type Cave = Map<Key, Node>;
class Node {
  value: number;
  coords: Coords;
  up: PossiblyNode;
  down: PossiblyNode;
  left: PossiblyNode;
  right: PossiblyNode;
  constructor(value: number, coords: Coords) {
    Object.assign(this, {
      value,
      coords,
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

  isStart() {
    const [y, x] = this.coords;
    return y === 0 && x === 0;
  }
  isEnd() {
    const [y, x] = this.coords;
    return y === 9 && x === 9;
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

      if (up) up.down = node;
      if (down) down.up = node;
      if (left) left.right = node;
      if (right) right.left = node;

      cave.set(key(y, x), node);
    }
  }

  return cave;
};

const findPaths = (start: Node) => {
  // const paths: Coords[][] = [];
  let lowestRiskPath = Infinity;

  const traverse = (
    node: Node,
    path: Coords[],
    risk: number,
    visited: Record<Key, boolean>
  ) => {
    const isVisited = (node: Node) =>
      node ? visited[key(...node.coords)] : true;

    // path.push(node.coords);
    if (!node.isStart()) {
      risk += node.value;
    }

    if (
      risk > lowestRiskPath ||
      (isVisited(node.up) &&
        isVisited(node.down) &&
        isVisited(node.left) &&
        isVisited(node.right))
    )
      return;

    // if (node.up && !node.up.isStart() && !isVisited(node.up)) {
    //   traverse(node.up, [...path], risk, { ...visited });
    // }
    if (node.down && !node.down.isStart() && !isVisited(node.down)) {
      traverse(node.down, [...path], risk, { ...visited });
    }
    // if (node.left && !node.left.isStart() && !isVisited(node.left)) {
    //   traverse(node.left, [...path], risk, { ...visited });
    // }
    if (node.right && !node.right.isStart() && !isVisited(node.right)) {
      traverse(node.right, [...path], risk, { ...visited });
    }

    if (node.isEnd()) {
      if (lowestRiskPath > risk) lowestRiskPath = risk;
      return;
      // return paths.push(path);
    }
  };

  traverse(start, [], 0, {});

  // console.log(paths);
  console.log(lowestRiskPath);
  return lowestRiskPath;
};

export const chiton = (input: number[][]) => {
  const cave = buildMap(input);
  return findPaths(cave.get(key(0, 0)));
};
