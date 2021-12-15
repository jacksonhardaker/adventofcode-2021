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
  // Let the node at which we are starting at be called the initial node.
  // Let the distance of node Y be the distance from the initial node to Y.
  // Dijkstra's algorithm will initially start with infinite distances and will try to improve them step by step.
  // 1.
  // Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
  const unvisited = new Set(cave.values());
  const tentatives = Array.from(cave.keys()).reduce((acc, key) => {
    acc.set(key, key === '0,0' ? 0 : Infinity);
    return acc;
  }, new Map<string, number>());

  // 2.
  // Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.
  // The tentative distance of a node v is the length of the shortest path discovered so far between the node v and the starting node.
  // Since initially no path is known to any other vertex than the source itself (which is a path of length zero),
  // all other tentative distances are initially set to infinity. Set the initial node as current.
  let current = start;
  while (current) {
    // 3.
    // For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node.
    //  Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.
    // For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbor B has length 2, then the distance to B through A will be 6 + 2 = 8.
    // If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, the current value will be kept.
    [current.up, current.down, current.left, current.right].forEach(
      (neighbor) => {
        if (unvisited.has(neighbor)) {
          const oldTentative = tentatives.get(neighbor.key);
          const newTentative = tentatives.get(current.key) + neighbor.value;
          tentatives.set(
            neighbor.key,
            newTentative < oldTentative ? newTentative : oldTentative
          );
        }
      }
    );

    // 4.
    // When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited and remove it from the unvisited set.
    // A visited node will never be checked again.
    unvisited.delete(current);

    // 5.
    // If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance
    // among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the
    // initial node and remaining unvisited nodes), then stop. The algorithm has finished.
    if (current.isEnd) {
      break;
    }

    // 6.
    // Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new current node, and go back to step 3.
    current = Array.from(unvisited.values()).reduce((acc, node) => {
      if (!acc) return node;

      const nodeVal = tentatives.get(node.key);
      const accVal = tentatives.get(acc.key);

      return nodeVal < accVal ? node : acc;
    }, null);
  }

  return Array.from(tentatives.values())[tentatives.size - 1];
};

export const chiton = (input: number[][]) => {
  const cave = buildMap(input);
  return findPaths(cave.get(key(0, 0)), cave);
};
