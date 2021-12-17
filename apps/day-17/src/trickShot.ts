export const parseInput = (input: string) => {
  const [, x1, x2, y1, y2] = input
    .match(
      /target\sarea:\sx=(?<x1>-?\d+)..(?<x2>-?\d+),\sy=(?<y1>-?\d+)..(?<y2>-?\d+)/
    )
    .map(Number);
  return { x1, x2, y1, y2 };
};
export const trickShot = (input: string) => {
  return null;
};
