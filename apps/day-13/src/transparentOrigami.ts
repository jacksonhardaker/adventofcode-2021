type Fold = { axis: 'y' | 'x'; line: number };
type Coords = { x: number; y: number };

const applyFold = (dots: Coords[], fold: Fold) => {
  return dots.reduce((acc, dot) => {
    if (dot[fold.axis] < fold.line) {
      return { ...acc, [`${dot.x},${dot.y}`]: true };
    } else {
      const dot2 = {
        ...dot,
        [fold.axis]: Math.abs(dot[fold.axis] - 2 * fold.line),
      };
      return { ...acc, [`${dot2.x},${dot2.y}`]: true };
    }
  }, {});
};

export const transparentOrigami = (input: string[][]) => {
  const dots = input[0].map((line) => {
    const [x, y] = line.split(',').map(Number);
    return { x, y } as Coords;
  });
  const folds = input[1].map((line) => {
    const [, axis, fold] = line.match(/fold\salong\s(y|x)=(\d+)/);
    return { axis, line: Number(fold) } as Fold;
  });

  const dotsAfterFold = applyFold(dots, folds[0]);

  return Object.keys(dotsAfterFold).length;
};
