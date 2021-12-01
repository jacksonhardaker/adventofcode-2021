export const sonarSweep = (input: number[]) => {
  return input.reduce(
    (count, depth, index) => (depth > input[index - 1] ? count + 1 : count),
    0
  );
};

const getWindow = (index: number, input: number[]) =>
  input[index] + input[index + 1] + input[index + 2];

export const slidingWindow = (input: number[]) => {
  let increaseCount = 0;
  for (let i = 0; i < input.length - 3; i++) {
    const currentWindow = getWindow(i, input);
    const nextWindow = getWindow(i + 1, input);

    if (Number.isNaN(currentWindow) || Number.isNaN(nextWindow)) break;

    if (nextWindow > currentWindow) {
      increaseCount++;
    }
  }
  return increaseCount;
};
