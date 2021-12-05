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

const logVents = (vents) => {
  const drawing = Array(10)
    .fill(0)
    .map(() => []);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (!Array.isArray(drawing[i])) {
        drawing[i] = Array(10).fill('.');
      }
      drawing[i][j] = vents?.[i]?.[j] || '.';
    }
  }

  console.log(drawing.map((row) => row.join(' ')).join('\n'));
};

const logCoords = (x1, x2, y1, y2) => {
  console.log(`${x1},${y1} -> ${x2},${y2}`);
};

export const hydrothermalVenture = (
  input: string[],
  considerDiagonals = false
) => {
  const vents = [];
  const intersections = new Map();

  const deltaCondition = (index: number, end: number, delta: number) =>
    delta === 1 ? index <= end : index >= end;

  parseInput(input).forEach(({ x1, y1, x2, y2 }) => {
    const xDelta = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
    const yDelta = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;

    const isHorizontalOrVertical = x1 === x2 || y1 === y2;
    const is45Degrees = Math.abs(x1 - x2) === Math.abs(y1 - y2);
    const shouldProccess = considerDiagonals
      ? isHorizontalOrVertical || is45Degrees
      : isHorizontalOrVertical;

    if (shouldProccess) {
      let x = x1;
      let y = y1;
      while (deltaCondition(x, x2, xDelta) && deltaCondition(y, y2, yDelta)) {
        if (!Array.isArray(vents[y])) {
          vents[y] = [];
        }

        if (vents[y][x]) {
          vents[y][x]++;
          intersections.set(`${x},${y}`, true);
        } else {
          vents[y][x] = 1;
        }

        x += xDelta;
        y += yDelta;
      }

      // logCoords(x1, x2, y1, y2);
      // logVents(vents);
    }
  });

  return intersections.size;
};
