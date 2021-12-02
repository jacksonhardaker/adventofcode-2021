export type Direction = 'up' | 'down' | 'forward';

export const dive = (
  input: Array<[Direction, number]>,
  depth = 0,
  horizontal = 0
) => {
  if (input.length === 0) return depth * horizontal;

  return dive(
    input.slice(1),
    input[0][0] === 'forward'
      ? depth
      : depth + input[0][1] * (input[0][0] === 'up' ? -1 : 1),
    input[0][0] === 'forward' ? horizontal + input[0][1] : horizontal
  );
};

export const diveWithAim = (
  input: Array<[Direction, number]>,
  depth = 0,
  horizontal = 0,
  aim = 0
) => {
  if (input.length === 0) return depth * horizontal;

  return diveWithAim(
    input.slice(1),
    input[0][0] === 'forward' ? depth + aim * input[0][1] : depth,
    input[0][0] === 'forward' ? horizontal + input[0][1] : horizontal,
    input[0][0] === 'forward'
      ? aim
      : aim + input[0][1] * (input[0][0] === 'up' ? -1 : 1)
  );
};
