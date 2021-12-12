import { processInput } from '@adventofcode-2021/util-io';
import { passagePathing } from './passagePathing';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = passagePathing(input);

  console.log(`part 1: ${result1}`);
})();
