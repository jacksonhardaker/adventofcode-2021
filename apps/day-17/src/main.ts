import { processInput } from '@adventofcode-2021/util-io';
import { trickShot } from './trickShot';

(async () => {
  const [input] = await processInput('assets/input.txt', { root: __dirname });
  const result1 = trickShot(input);

  console.log(`part 1: ${result1}`);
})();
