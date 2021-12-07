import { processInput } from '@adventofcode-2021/util-io';
import { whaleTreachery } from './whaleTreachery';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = whaleTreachery(input);

  console.log(`part 1: ${result1}`);
})();
