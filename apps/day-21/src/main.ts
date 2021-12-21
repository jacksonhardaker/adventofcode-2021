import { processInput } from '@adventofcode-2021/util-io';
import { diracDice } from './diracDice';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = diracDice(input);

  console.log(`part 1: ${result1}`);
})();
