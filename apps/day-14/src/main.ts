import { processInput } from '@adventofcode-2021/util-io';
import { extendedPolymerization } from './extendedPolymerization';
import { extendedPolymerization as extendedPolymerizationV2 } from './extendedPolymerizationV2';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname, delimiter: '\n\n' });
  const result1a = extendedPolymerization(input);
  const result1b = extendedPolymerizationV2(input);
  // const result2 = extendedPolymerization(input, 40);

  console.log(`part 1: ${result1b}`); // 3306
  // console.log(`part 2: ${result2}`);
})();
