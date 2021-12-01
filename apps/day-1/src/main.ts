import { processInput } from '@adventofcode-2021/util-io';
import { sonarSweep, slidingWindow } from './sonarSweep';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname, parser: Number });
  const result1 = sonarSweep(input);
  const result2 = slidingWindow(input);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
