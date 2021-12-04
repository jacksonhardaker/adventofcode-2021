type Row = number[];
type Board = Row[];
type CalledNumbers = Map<number, boolean>;

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

const findWinningBoards = (
  numbers: number[],
  boards: Board[],
  breakOnFirstWin = true
): [Board[], CalledNumbers] => {
  const winningBoards = [];
  const calledNumbers = new Map();

  for (const number of numbers) {
    calledNumbers.set(number, true);

    for (const board of boards) {
      for (const row of board) {
        const isWinningRow = row.every((num) => calledNumbers.get(num));

        if (isWinningRow) {
          !winningBoards.includes(board) && winningBoards.push(board);
          if (breakOnFirstWin || winningBoards.length === boards.length)
            return [winningBoards, calledNumbers];
        }
      }

      for (let col = 0; col < 5; col++) {
        const isWinningCol = board.every((row) => calledNumbers.get(row[col]));

        if (isWinningCol) {
          !winningBoards.includes(board) && winningBoards.push(board);
          if (breakOnFirstWin || winningBoards.length === boards.length)
            return [winningBoards, calledNumbers];
        }
      }
    }
  }

  return [winningBoards, calledNumbers];
};

const sumOfUncalled = (board: Board, calledNumbers: CalledNumbers): number =>
  board.reduce((sum, row) => {
    row.forEach((num) => {
      sum = calledNumbers.get(num) ? sum : sum + num;
    });
    return sum;
  }, 0);

const popNumber = (calledNumbers: CalledNumbers): number =>
  Array.from(calledNumbers.keys()).pop();

export const giantSquid = (input: string) => {
  const [numbers, boards] = parseInput(input);
  const [[winningBoard], calledNumbers] = findWinningBoards(numbers, boards);
  return sumOfUncalled(winningBoard, calledNumbers) * popNumber(calledNumbers);
};

export const letTheSquidWin = (input: string) => {
  const [numbers, boards] = parseInput(input);
  const [winningBoards, calledNumbers] = findWinningBoards(
    numbers,
    boards,
    false
  );
  return (
    sumOfUncalled(winningBoards.pop(), calledNumbers) * popNumber(calledNumbers)
  );
};
