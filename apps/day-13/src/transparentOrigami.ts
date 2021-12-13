type Fold = { axis: 'y' | 'x'; line: number };
type Dot = { x: number; y: number };

const parseInput = (input: string[][]) =>
  [
    input[0].map((line) => {
      const [x, y] = line.split(',').map(Number);
      return { x, y } as Dot;
    }),
    input[1].map((line) => {
      const [, axis, fold] = line.match(/fold\salong\s(y|x)=(\d+)/);
      return { axis, line: Number(fold) } as Fold;
    }),
  ] as [Dot[], Fold[]];

const printDots = (dots: Dot[]) => {
  const output: string[] = dots.reduce((output, { x, y }) => {
    output[y] = output[y] || [];
    output[y][x] = '⬜️';
    return output;
  }, []);

  console.log(
    output
      .map((row) =>
        Array.from(row).reduce((acc, point) => acc + (point || '⬛️'), '')
      )
      .join('\n')
  );
};

const applyFold = (dots: Dot[], fold: Fold) => {
  const foldedDots = dots.reduce((acc, dot) => {
    const dot2 =
      dot[fold.axis] < fold.line
        ? dot
        : {
            ...dot,
            [fold.axis]: Math.abs(dot[fold.axis] - 2 * fold.line),
          };
    return { ...acc, [`${dot2.x},${dot2.y}`]: dot2 };
  }, {});

  return Object.values(foldedDots) as Dot[];
};

export const transparentOrigami = (input: string[][], foldsToExec = 1) => {
  const [dots, folds] = parseInput(input);
  return folds
    .slice(0, foldsToExec)
    .reduce((acc, fold) => applyFold(acc, fold), dots).length;
};

export const printInstructions = (input: string[][]) => {
  const [dots, folds] = parseInput(input);
  const result = folds.reduce((acc, fold) => applyFold(acc, fold), dots);
  printDots(result);
};
