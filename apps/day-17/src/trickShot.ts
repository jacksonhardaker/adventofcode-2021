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
// const findTrajectories = (targetX, targetY) => {
//   const [startX, startY] = [0, 0];
//   const [minX, minY, maxX, maxY] = [-100, -100, 100, 100];
// };

export const trickShot = ({ x1, x2, y1, y2 }: TargetArea) => {
  const [startX, startY] = [0, 0];
  // const cont = (delta, start, end) =>
  //   start < end ? delta <= end : delta >= end;
  // const inc = (start, end) => (start < end ? 1 : -1);

  // for (let x = x1; cont(x, x1, x2); x += inc(x1, x2)) {
  //   for (let y = y1; cont(y, y1, y2); y += inc(y1, y2)) {
  //     // find all trajectories which will hit x,y from a start of 0,0
  //   }
  // }
  const willHitTarget = ([initialVelX, initialVelY]) => {
    let [velX, velY] = [initialVelX, initialVelY];
    let [x, y] = [startX, startY];
    let isBelowTarget = y < Math.min(y1, y2);
    let isBeyondTarget = x > Math.max(x1, x2);
    while (!isBelowTarget && !isBeyondTarget) {
      x += velX;
      y += velY;
      velX = velX === 0 ? 0 : velX > 0 ? velX - 1 : velX + 1;
      velY += -1;
      isBelowTarget = y < Math.min(y1, y2);
      isBeyondTarget = x > Math.max(x1, x2);

      if (
        x < Math.max(x1, x2) &&
        x > Math.min(x1, x2) &&
        y < Math.max(y1, y2) &&
        y > Math.min(y1, y2)
      ) {
        // within target
        return true;
      }
    }
    return false;
  };
  const trajectories = [];

  if (willHitTarget([7, 2])) {
    trajectories.push([7, 2]);
  }

  // for (let x = -100; x <= 100; x++) {
  //   for (let y = -100; y <= 100; y++) {
  //     //
  //   }
  // }

  return null;
};
