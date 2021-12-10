const PAIRS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export const syntaxScoring = (input: string[]) => {
  const points = input.reduce((acc, line) => {
    const stack = [];
    for (const symbol of line) {
      if (symbol.match(/[([{<]/)) {
        stack.push(symbol);
      } else if (PAIRS[stack.pop()] !== symbol) {
        return acc + POINTS[symbol];
      }
    }
    return acc;
  }, 0);

  return points;
};
