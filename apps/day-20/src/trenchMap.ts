const parseInput = (input: string) => {
  const [algo, rawImg] = input.split('\n\n');
  let maxRowLength = 0;
  const img = rawImg.split('\n').map((row) => {
    maxRowLength = Math.max(maxRowLength, row.length);
    return Array.from(row);
  });

  const map = [];
  for (let y = 0; y < img.length; y++) {
    map.push([]);
    for (let x = 0; x < maxRowLength; x++) {
      map[map.length - 1].push(img[y][x]);
    }
  }

  return { algo, map };
};

const enhance = (algo, map, itration) => {
  const emptyChar = algo[0] === '#' ? (itration % 2 === 0 ? '.' : '#') : '.';
  const maxRow = Math.max(...map.map((m) => m.length)) + 6;
  const maxCol = map.length + 6;
  const padded = [
    Array(maxRow).fill(emptyChar),
    Array(maxRow).fill(emptyChar),
    Array(maxRow).fill(emptyChar),
    ...map.map((r) => [
      ...Array(3).fill(emptyChar),
      ...r,
      ...Array(3).fill(emptyChar),
    ]),
    Array(maxRow).fill(emptyChar),
    Array(maxRow).fill(emptyChar),
    Array(maxRow).fill(emptyChar),
  ];

  const enhanced = [];

  for (let y = 2; y < maxCol - 2; y++) {
    enhanced.push([]);
    for (let x = 2; x < maxRow - 2; x++) {
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
        (acc, [y2, x2]) => `${acc}${padded?.[y2]?.[x2] === '#' ? '1' : '0'}`,
        ''
      );

      const index = parseInt(binary, 2);
      if (algo[index] === '#') {
        enhanced[enhanced.length - 1].push('#');
      } else {
        enhanced[enhanced.length - 1].push('.');
      }
    }
  }

  // console.log(padded.map((m) => m.join('')).join('\n'));
  // console.log(enhanced.map((m) => m.join('')).join('\n'));
  return enhanced;
};

export const trenchMap = (input: string, enhancements = 2) => {
  const { algo, map } = parseInput(input);

  const result = Array(enhancements)
    .fill(0)
    .reduce((acc, _, i) => enhance(algo, acc, i), map);

  return result
    .map((r) => r.join(''))
    .join('')
    .match(/#/g).length;
};
