import { processInput } from '@adventofcode-2021/util-io';
import { lanternfish } from './lanternfish';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    delimiter: ',',
    parser: Number,
  });
  const result1 = lanternfish(input, 80);

  console.log(`part 1: ${result1}`);
})();
