import { processInput } from '@adventofcode-2021/util-io';
import { smokeBasin } from './smokeBasin';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = smokeBasin(input);

  console.log(`part 1: ${result1}`);
})();
