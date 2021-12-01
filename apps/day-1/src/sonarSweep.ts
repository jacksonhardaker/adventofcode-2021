export const sonarSweep = (input: number[]) => {
  return input.reduce(
    (count, depth, index) => (depth > input[index - 1] ? count + 1 : count),
    0
  );
};
