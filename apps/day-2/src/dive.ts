export type Direction = 'up' | 'down' | 'forward';

export const dive = (input: Array<[Direction, number]>) => {
  let depth = 0,
    horizontalPosition = 0;

  input.forEach(([direction, amount]) => {
    const multiplier = direction === 'up' ? -1 : 1;

    if (direction === 'forward') {
      horizontalPosition += amount;
    } else {
      depth += amount * multiplier;
    }
  });
  return depth * horizontalPosition;
};
