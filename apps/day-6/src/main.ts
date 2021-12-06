import { processInput } from '@adventofcode-2021/util-io';
import { lanternfish } from './lanternfish';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    delimiter: ',',
    parser: Number,
  });
  const result1 = lanternfish(input, 80);
  const result2 = lanternfish(input, 256);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
