import { processInput } from '@adventofcode-2021/util-io';
import { dive } from './dive';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = dive(input);

  console.log(`part 1: ${result1}`);
})();
