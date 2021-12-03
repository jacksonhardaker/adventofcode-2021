import { processInput } from '@adventofcode-2021/util-io';
import { binaryDiagnostic } from './binaryDiagnostic';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = binaryDiagnostic(input);

  console.log(`part 1: ${result1}`);
})();
