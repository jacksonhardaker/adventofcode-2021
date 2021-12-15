import { processInput } from '@adventofcode-2021/util-io';
import { chiton } from './chiton';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    parser: (row) => Array.from(row).map(Number),
  });
  const result1 = chiton(input);

  console.log(`part 1: ${result1}`);
})();
