type TargetArea = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export const parseInput = (input: string): TargetArea => {
  const [, x1, x2, y1, y2] = input
    .match(
      /target\sarea:\sx=(?<x1>-?\d+)..(?<x2>-?\d+),\sy=(?<y1>-?\d+)..(?<y2>-?\d+)/
    )
    .map(Number);
  return { x1, x2, y1, y2 };
};

/**
 * The probe's x,y position starts at 0,0. Then, it will follow some trajectory by moving in steps.
 * On each step, these changes occur in the following order:
 *
 * The probe's x position increases by its x velocity.
 * The probe's y position increases by its y velocity.
 * Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, it decreases by 1 if it is
 *    greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
 * Due to gravity, the probe's y velocity decreases by 1.
 */
const findTrajectories = (targetX, targetY) => {
  const [startX, startY] = [0, 0];
  const [minX, minY, maxX, maxY] = [-100, -100, 100, 100];
};

export const trickShot = ({ x1, x2, y1, y2 }: TargetArea) => {
  const cont = (delta, start, end) =>
    start < end ? delta <= end : delta >= end;
  const inc = (start, end) => (start < end ? 1 : -1);

  for (let x = x1; cont(x, x1, x2); x += inc(x1, x2)) {
    for (let y = y1; cont(y, y1, y2); y += inc(y1, y2)) {
      // find all trajectories which will hit x,y from a start of 0,0
    }
  }
  return null;
};
