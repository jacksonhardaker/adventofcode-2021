import { processInput } from '@adventofcode-2021/util-io';
import { snailFish } from './snailFish';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = snailFish(input);

  console.log(`part 1: ${result1}`);
})();
