import { processInput } from '@adventofcode-2021/util-io';
import { dumbOctopus } from './dumbOctopus';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname, parser: (line) => Array.from(line).map(Number) });
  const result1 = dumbOctopus(input);

  console.log(`part 1: ${result1}`);
})();
