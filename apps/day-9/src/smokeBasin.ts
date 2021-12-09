const findLowPoints = (input: number[][]) => {
  const lowPoints = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const surrounding = [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1],
      ].map(([yy, xx]) => input?.[yy]?.[xx] ?? Infinity);

      if (surrounding.every((point) => input[y][x] < point)) {
        lowPoints.push([x, y]);
      }
    }
  }
  return lowPoints;
};

export const smokeBasin = (input: number[][]) => {
  const lowPoints = findLowPoints(input);
  return lowPoints.reduce((acc, [x, y]) => acc + input[y][x] + 1, 0);
};

export const part2 = (input: number[][]) => {
  const traverse = (x: number, y: number, visited = {}) => {
    visited[`${x},${y}`] = true;

    const visit = ([x2, y2]: [number, number]) =>
      visited[`${x2},${y2}`] ? 0 : traverse(x2, y2, visited);

    if ([9, undefined].includes(input?.[y]?.[x])) return 0;

    return ([
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ] as [number, number][]).reduce((acc, coords) => acc + visit(coords), 1);
  };

  return findLowPoints(input)
    .map(([x, y]) => traverse(x, y))
    .sort((a, b) => (a === b ? 0 : a > b ? 1 : -1))
    .slice(-3)
    .reduce((acc, size) => acc * size, 1);
};
