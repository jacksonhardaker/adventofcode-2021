import { processInput } from '@adventofcode-2021/util-io';
import { hydrothermalVenture } from './hydrothermalVenture';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = hydrothermalVenture(input);
  const result2 = hydrothermalVenture(input, true);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
