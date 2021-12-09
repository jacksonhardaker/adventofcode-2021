export const smokeBasin = (input: number[][]) => {
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

  return lowPoints.reduce((acc, [x,y]) => acc + input[y][x] + 1, 0);
};
