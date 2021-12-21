const parseInput = (input: string[]) =>
  input.map((player) => Number(player.split(':').pop()));

function* dieGenerator(): Generator<number, number, unknown> {
  let side = 1;

  while (true) {
    yield side;
    side++;
    if (side > 100) {
      side = 1;
    }
  }
}

export const diracDice = (input: string[]) => {
  const [p1Start, p2Start] = parseInput(input);
  const die = dieGenerator();
  const scores = { p1: 0, p2: 0 };
  const pos = { p1: p1Start, p2: p2Start };
  let rolls = 0;
  let turn = 'p1';

  const switchPlayer = () => {
    turn = turn === 'p1' ? 'p2' : 'p1';
  };

  const moveForward = (places) => {
    const newPos = (pos[turn] + places) % 10;
    pos[turn] = newPos === 0 ? 10 : newPos;
    scores[turn] += pos[turn];
  };

  const roll = () => {
    rolls++;
    return die.next().value;
  };

  while (scores.p1 < 1000 && scores.p2 < 1000) {
    const [roll1, roll2, roll3] = Array(3).fill(0).map(roll);

    moveForward(roll1 + roll2 + roll3);

    switchPlayer();
  }

  return Math.min(scores.p1, scores.p2) * rolls;
};

export const quantumDie = (input: string[]) => {
  const [p1Start, p2Start] = parseInput(input);
  const wins = { p1: 0, p2: 0 };

  const recursive = (
    scores: { p1: number; p2: number },
    pos: { p1: number; p2: number },
    turn: 'p1' | 'p2',
    rolls: number
  ) => {
    //
  };

  recursive({ p1: 0, p2: 0 }, { p1: p1Start, p2: p2Start }, 'p1', 0);
};
