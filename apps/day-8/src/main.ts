import { processInput } from '@adventofcode-2021/util-io';
import { sevenSegmentSearch } from './sevenSegmentSearch';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = sevenSegmentSearch(input);

  console.log(`part 1: ${result1}`);
})();
