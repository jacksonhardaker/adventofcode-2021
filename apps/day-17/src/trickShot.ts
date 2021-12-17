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

export const trickShot = ({ x1, x2, y1, y2 }: TargetArea) => {
  const [startX, startY] = [0, 0];
  let maxY = -Infinity;

  const willHitTarget = ([initialVelX, initialVelY]) => {
    let trajMaxY = -Infinity;
    let [velX, velY] = [initialVelX, initialVelY];
    let [x, y] = [startX, startY];
    while (!(y < Math.min(y1, y2)) && !(x > Math.max(x1, x2))) {
      x += velX;
      y += velY;
      velX = velX === 0 ? 0 : velX > 0 ? velX - 1 : velX + 1;
      velY += -1;

      trajMaxY = Math.max(trajMaxY, y);

      if (
        x <= Math.max(x1, x2) &&
        x >= Math.min(x1, x2) &&
        y <= Math.max(y1, y2) &&
        y >= Math.min(y1, y2)
      ) {
        // within target
        maxY = Math.max(maxY, trajMaxY);
        return true;
      }
    }
    return false;
  };
  const trajectories = [];

  for (let trajX = -1000; trajX < 1000; trajX++) {
    for (let trajY = -1000; trajY < 1000; trajY++) {
      if (willHitTarget([trajX, trajY])) {
        trajectories.push([trajX, trajY]);
      }
    }
  }

  return { trajectories, maxY };
};
