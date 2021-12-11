import { processInput } from '@adventofcode-2021/util-io';
import { dumbOctopus, dumbOctopusSync } from './dumbOctopus';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname, parser: (line) => Array.from(line).map(Number) });
  const result1 = dumbOctopus(input);
  const result2 = dumbOctopusSync(input);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
