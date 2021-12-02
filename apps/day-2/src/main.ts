import { processInput } from '@adventofcode-2021/util-io';
import { dive, Direction } from './dive';

const parser = (instruction) => {
  const [direction, amount] = instruction.split(' ');

  return [direction as Direction, Number(amount)] as [Direction, number];
};

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname, parser });
  const result1 = dive(input);

  console.log(`part 1: ${result1}`);
})();
