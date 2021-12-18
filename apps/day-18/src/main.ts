import { processInput } from '@adventofcode-2021/util-io';
import { day-18 } from './day-18';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = day-18(input);

  console.log(`part 1: ${result1}`);
})();
