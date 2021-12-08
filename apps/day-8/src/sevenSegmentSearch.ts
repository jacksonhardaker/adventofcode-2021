
export const sevenSegmentSearch = (input: string[]) => {
  return input.reduce((acc, input) => {
    const matches = input
      .split('|')[1]
      .match(
        RegExp(
          [2, 3, 4, 7].map((num) => `(\\b[a-z]{${num}}\\b)`).join('|'),
          'g'
        )
      ) || [];
    return matches.length + acc;
  }, 0);
};
