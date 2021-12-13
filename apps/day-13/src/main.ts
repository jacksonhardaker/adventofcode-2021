import { processInput } from '@adventofcode-2021/util-io';
import { transparentOrigami } from './transparentOrigami';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    delimiter: '\n\n',
    parser: (line) => line.split('\n'),
  });
  const result1 = transparentOrigami(input);

  console.log(`part 1: ${result1}`);
})();
