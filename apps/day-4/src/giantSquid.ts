type Row = number[];
type Board = Row[];

export const parseInput = (input: string) => {
  const [orderString, ...rest] = input.split('\n');
  const numbers = orderString.split(',').map(Number);

  const boards: Board[] = rest.reduce((acc, row) => {
    row.length === 0
      ? acc.push([])
      : acc[acc.length - 1].push(row.match(/(\d+)/g).map(Number));
    return acc;
  }, []);

  return [numbers, boards] as [number[], Board[]];
};

const findWinningBoard = (numbers: number[], boards: Board[]) => {
  const calledNumbers = new Map();

  for (const number of numbers) {
    calledNumbers.set(number, true);

    for (const board of boards) {
      for (const row of board) {
        const isWinningRow = row.every((num) => calledNumbers.get(num));

        if (isWinningRow) {
          return [board, calledNumbers] as [Board, Map<number, boolean>];
        }
      }

      for (let col = 0; col < 5; col++) {
        const isWinningCol = board.every((row) => calledNumbers.get(row[col]));

        if (isWinningCol) {
          return [board, calledNumbers] as [Board, Map<number, boolean>];
        }
      }
    }
  }
};

export const giantSquid = (input: string) => {
  const [numbers, boards] = parseInput(input);

  const [winningBoard, calledNumbers] = findWinningBoard(numbers, boards);

  const lastNumber: number = Array.from(calledNumbers.keys()).pop();

  const sumOfUncalled = winningBoard.reduce((sum, row) => {
    row.forEach((num) => {
      sum = calledNumbers.get(num) ? sum : sum + num;
    });
    return sum;
  }, 0);

  return sumOfUncalled * lastNumber;
};

export const letTheSquidWin = (input: string) => {
  const [numbers, boards] = parseInput(input);

  let [winningBoard, calledNumbers] = findWinningBoard(numbers, boards);
  let remainingBoards = boards.filter((board) => board !== winningBoard);
  while(remainingBoards.length >= 1) {
    [winningBoard, calledNumbers] = findWinningBoard(numbers, remainingBoards);
    remainingBoards = remainingBoards.filter((board) => board !== winningBoard);
  };

  const lastNumber: number = Array.from(calledNumbers.keys()).pop();

  const sumOfUncalled = winningBoard.reduce((sum, row) => {
    row.forEach((num) => {
      sum = calledNumbers.get(num) ? sum : sum + num;
    });
    return sum;
  }, 0);

  return sumOfUncalled * lastNumber;
};
