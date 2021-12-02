export type Direction = 'up' | 'down' | 'forward';

export const dive = (input: Array<[Direction, number]>) => {

  const [depth, horizontal] = input.reduce(
    ([depth, horizontal], [direction, amount]) => {
      const multiplier = direction === 'up' ? -1 : 1;

      return direction === 'forward'
        ? [depth, horizontal + amount]
        : [depth + amount * multiplier, horizontal];
    },
    [0, 0]
  );

  return depth * horizontal;
};
