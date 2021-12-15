import { processInput } from '@adventofcode-2021/util-io';
import { chiton, expandMap } from './chiton';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    parser: (row) => Array.from(row).map(Number),
  });
  const result1 = chiton(input);
  const expandedMap = expandMap(input);
  
  console.log(`part 1: ${result1}`);
  
  const result2 = chiton(expandedMap);
  console.log(`part 2: ${result2}`);
})();
