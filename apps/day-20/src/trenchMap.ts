type MinMax = {
  minCol: number;
  maxCol: number;
  minRow: number;
  maxRow: number;
};

const parseInput = (input: string) => {
  const [algo, rawImg] = input.split('\n\n');
  const img = rawImg.split('\n').map((row) => Array.from(row));
  const map = new Set<string>();
  const minMax: MinMax = {
    minCol: 0,
    maxCol: img.length - 1,
    minRow: 0,
    maxRow: 0,
  };

  img.forEach((row, y) => {
    minMax.maxRow = Math.max(minMax.maxRow, row.length);
    row.forEach((char, x) => {
      if (char === '#') {
        map.add(`${y},${x}`);
      }
    });
  });

  return { algo, map, minMax };
};

const enhance = (algo: string, minMax: MinMax, map: Set<string>) => {
  const enhanced = new Set<string>();
  const newMinMax = { ...minMax };

  for (let y = minMax.minCol - 1; y <= minMax.maxCol + 1; y++) {
    for (let x = minMax.minRow - 1; x <= minMax.maxRow + 1; x++) {
      const binary = [
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1],
        [y, x - 1],
        [y, x],
        [y, x + 1],
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
      ].reduce(
        (acc, [y2, x2]) => `${acc}${map.has(`${y2},${x2}`) ? '1' : '0'}`,
        ''
      );

      const index = parseInt(binary, 2);
      if (algo[index] === '#') {
        enhanced.add(`${y},${x}`);
        newMinMax.minCol = Math.min(newMinMax.minCol, y);
        newMinMax.minRow = Math.min(newMinMax.minRow, x);
        newMinMax.maxCol = Math.max(newMinMax.maxCol, y);
        newMinMax.maxRow = Math.max(newMinMax.maxRow, x);
      }
    }
  }

  return { map: enhanced, minMax: newMinMax };
};

const print = (map: Set<string>, minMax: MinMax, padding = 3) => {
  const output = [];
  for (
    let y = minMax.minCol + padding * -1;
    y <= minMax.maxCol + padding;
    y++
  ) {
    output.push('');
    for (
      let x = minMax.minRow + padding * -1;
      x <= minMax.maxRow + padding;
      x++
    ) {
      output[output.length - 1] += map.has(`${y},${x}`) ? '#' : '.';
    }
  }

  console.log(output.join('\n'));
};

export const trenchMap = (input: string, enhancements = 2) => {
  const { algo, minMax, map } = parseInput(input);

  const result = Array(enhancements)
    .fill(0)
    .reduce(
      (acc: { map: Set<string>; minMax: MinMax }) =>
        enhance(algo, acc.minMax, acc.map),
      {
        map,
        minMax,
      }
    );

  print(result.map, result.minMax);
  return result.map.size;
};
