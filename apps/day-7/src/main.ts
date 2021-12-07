import { processInput } from '@adventofcode-2021/util-io';
import { whaleTreachery } from './whaleTreachery';

(async () => {
  const input = await processInput('assets/input.txt', {
    root: __dirname,
    parser: Number,
    delimiter: ',',
  });
  const result1 = whaleTreachery(input);
  const result2 = whaleTreachery(input, false);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
