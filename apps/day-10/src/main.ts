import { processInput } from '@adventofcode-2021/util-io';
import { syntaxScoring } from './syntaxScoring';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = syntaxScoring(input);

  console.log(`part 1: ${result1}`);
})();
