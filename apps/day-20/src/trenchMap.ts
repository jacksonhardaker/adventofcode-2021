const parseInput = (input: string) => {
  const [algo, rawImg] = input.split('\n\n');

  const img = rawImg.split('\n').map((row) => Array.from(row));

  return { algo, img };
};

const enhance = (algo: string, img: string[][]) => {
  const enhanced = [];
  let litCount = 0;

  for (let y = -1; y < img.length + 1; y++) {
    enhanced.push([]);
    for (let x = -1; x < img[0].length + 1; x++) {
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
        (acc, [y2, x2]) => `${acc}${img?.[y2]?.[x2] === '#' ? '1' : '0'}`,
        ''
      );

      const index = parseInt(binary, 2);
      enhanced[enhanced.length - 1].push(algo[index]);

      litCount += algo[index] === '#' ? 1 : 0;
    }
  }

  return { img: enhanced, litCount };
};

const print = (img: string[][], padding = 3) => {
  const output = [];
  for (let y = padding * -1; y < img.length + padding; y++) {
    output.push('');
    for (let x = padding * -1; x < img[0].length + padding; x++) {
      output[output.length - 1] += img?.[y]?.[x] ? img[y][x] : '.';
    }
  }

  console.log(output.join('\n'));
};

export const trenchMap = (input: string, enhancements = 2) => {
  const { algo, img } = parseInput(input);

  const { img: result, litCount } = Array(enhancements)
    .fill(0)
    .reduce((acc) => enhance(algo, acc.img), { img, litCount: 0 });

  print(result);
  return litCount;
};
