import { processInput } from '@adventofcode-2021/util-io';
import { parseInput, trickShot } from './trickShot';

(async () => {
  const input = parseInput(await processInput('assets/input.txt', { root: __dirname })[0]);
  const result1 = trickShot(input);

  console.log(`part 1: ${result1}`);
})();
