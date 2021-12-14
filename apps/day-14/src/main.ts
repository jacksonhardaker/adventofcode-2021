import { processInput } from '@adventofcode-2021/util-io';
import { extendedPolymerization } from './extendedPolymerization';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname, delimiter: '\n\n' });
  const result1 = extendedPolymerization(input);

  console.log(`part 1: ${result1}`);
})();
