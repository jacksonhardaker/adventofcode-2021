import { processInput } from '@adventofcode-2021/util-io';
import { passagePathing, passagePathing2 } from './passagePathing';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = passagePathing(input);
  const result2 = passagePathing2(input);

  console.log(`part 1: ${result1.length}`);
  console.log(`part 2: ${result2.length}`);
})();
