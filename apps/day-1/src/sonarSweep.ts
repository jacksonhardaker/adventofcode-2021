export const sonarSweep = (input: number[]) => {
  return input.reduce(
    (count, depth, index) => (depth > input[index - 1] ? count + 1 : count),
    0
  );
};

export const slidingWindow = (input: number[]) => {

  const getWindow = (i: number) => input[i] + input[i + 1] + input[i + 2];

  return input.reduce((count, _, i) => {
    const currentWindow = getWindow(i);
    const nextWindow = getWindow(i + 1);

    return !Number.isNaN(nextWindow) && nextWindow > currentWindow ? count + 1 : count;
  }, 0);
};
