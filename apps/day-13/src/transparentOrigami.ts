type Fold = { axis: 'y' | 'x'; line: number };
type Dot = { x: number; y: number };

const parseInput = (input: string[][]) => {
  const dots = input[0].map((line) => {
    const [x, y] = line.split(',').map(Number);
    return { x, y } as Dot;
  });
  const folds = input[1].map((line) => {
    const [, axis, fold] = line.match(/fold\salong\s(y|x)=(\d+)/);
    return { axis, line: Number(fold) } as Fold;
  });
  return [dots, folds] as [Dot[], Fold[]];
};

const printDots = (dots: Dot[]) => {
  const output = dots.reduce((output, { x, y }) => {
    output[y] = output[y] || [];
    output[y][x] = '#';
    return output;
  }, []);

  const outputStr = output
    .map((row) => {
      let rowStr = '';
      for (const point of row) {
        rowStr += point || '.'
      }
      return rowStr;
    })
    .join('\n');

  console.log(outputStr);
};

const applyFold = (dots: Dot[], fold: Fold) => {
  const foldedDots = dots.reduce((acc, dot) => {
    if (dot[fold.axis] < fold.line) {
      return { ...acc, [`${dot.x},${dot.y}`]: dot };
    } else {
      const dot2 = {
        ...dot,
        [fold.axis]: Math.abs(dot[fold.axis] - 2 * fold.line),
      };
      return { ...acc, [`${dot2.x},${dot2.y}`]: dot2 };
    }
  }, {});

  return Object.values(foldedDots) as Dot[];
};

export const transparentOrigami = (input: string[][], foldsToExec = 1) => {
  const [dots, folds] = parseInput(input);

  let dotsAfterFold = dots;
  for (let i = 0; i < foldsToExec; i++) {
    dotsAfterFold = applyFold(dotsAfterFold, folds[i]);
  }

  return dotsAfterFold.length;
};

export const printInstructions = (input: string[][]) => {
  const [dots, folds] = parseInput(input);

  const result = folds.reduce((acc, fold) => applyFold(acc, fold), dots);
  printDots(result);
};
