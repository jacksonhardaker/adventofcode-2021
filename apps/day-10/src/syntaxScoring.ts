const PAIRS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

export const syntaxScoring = (input: string[]) => {
  const POINTS = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

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

export const part2 = (input: string[]) => {
  const POINTS = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  const scores = input
    .reduce((acc, line) => {
      const stack: string[] = [];
      for (const symbol of line) {
        if (symbol.match(/[([{<]/)) {
          stack.push(symbol);
        } else if (PAIRS[stack.pop()] !== symbol) {
          return acc;
        }
      }
      return [
        ...acc,
        stack.reduceRight((acc, symbol) => acc * 5 + POINTS[PAIRS[symbol]], 0),
      ];
    }, [])
    .sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));

  return scores[Math.floor(scores.length / 2)];
};
