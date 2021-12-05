type Coords = { x1: number; y1: number; x2: number; y2: number };

const parseInput = (input: string[]): Coords[] => {
  return input.map((str) => {
    const { x1, x2, y1, y2 } = str.match(
      /(?<x1>\d+),(?<y1>\d+)\s->\s(?<x2>\d+),(?<y2>\d+)/
    ).groups;
    return {
      x1: Number(x1),
      x2: Number(x2),
      y1: Number(y1),
      y2: Number(y2),
    };
  });
};

export const hydrothermalVenture = (input: string[]) => {
  const vents = [];
  const intersections = new Map();

  const deltaCondition = (index: number, end: number, delta: number) =>
    delta === 1 ? index <= end : index >= end;

  parseInput(input).forEach(({ x1, y1, x2, y2 }) => {
    const xDelta = x1 < x2 ? 1 : -1;
    const yDelta = y1 < y2 ? 1 : -1;

    if (x1 === x2 || y1 === y2) {
      for (let x = x1; deltaCondition(x, x2, xDelta); x += xDelta) {
        for (let y = y1; deltaCondition(y, y2, yDelta); y += yDelta) {
          if (!Array.isArray(vents[y])) {
            vents[y] = [];
          }

          if (vents[y][x]) {
            vents[y][x]++;
            intersections.set(`${x},${y}`, true);
          } else {
            vents[y][x] = 1;
          }
        }
      }
    }
  });

  return intersections.size;
};
