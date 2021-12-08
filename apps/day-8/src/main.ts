import { processInput } from '@adventofcode-2021/util-io';
import { part2, sevenSegmentSearch } from './sevenSegmentSearch';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = sevenSegmentSearch(input);
  const result2 = part2(input);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
