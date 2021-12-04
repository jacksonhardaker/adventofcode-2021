import { processInput } from '@adventofcode-2021/util-io';
import { giantSquid } from './giantSquid';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = giantSquid(input);

  console.log(`part 1: ${result1}`);
})();
