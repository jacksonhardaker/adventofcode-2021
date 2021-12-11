import { processInput } from '@adventofcode-2021/util-io';
import { dumbOctopus } from './dumbOctopus';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = dumbOctopus(input);

  console.log(`part 1: ${result1}`);
})();
