export const parseInput = (input: string) => {
  const [orderString, ...rest] = input.split('\n');
  const numbers = orderString.split(',').map(Number);

  const boards = rest.reduce((acc, row) => {
    row.length === 0
      ? acc.push([])
      : acc[acc.length - 1].push(row.match(/(\d+)/g).map(Number));
    return acc;
  }, []);

  return [numbers, boards];
};

export const giantSquid = (input: string) => {
  parseInput(input);

  return null;
};
