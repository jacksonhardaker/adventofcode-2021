import { processInput } from '@adventofcode-2021/util-io';
import { binaryDiagnostic, oxygenDiagnostic } from './binaryDiagnostic';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = binaryDiagnostic(input);
  const result2 = oxygenDiagnostic(input);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
