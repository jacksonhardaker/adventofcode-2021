import { processInput } from '@adventofcode-2021/util-io';
import { chiton, expandMap } from './chiton';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    parser: (row) => Array.from(row).map(Number),
  });
  const part1Start = performance.now();
  const result1 = chiton(input);
  const part1End = performance.now();
  const expandedMap = expandMap(input);
  
  console.log(`part 1: ${result1}\nexecuted in: ${Math.round(part1End - part1Start)}ms`);
  
  const part2Start = performance.now();
  const result2 = chiton(expandedMap);
  const part2End = performance.now();
  console.log(`part 2: ${result2}\nexecuted in: ${Math.round(part2End - part2Start)}ms`);
})();
