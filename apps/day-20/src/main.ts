import { readFile } from '@adventofcode-2021/util-io';
import { trenchMap } from './trenchMap';

(async () => {
  const input = await readFile('assets/input.txt', { root: __dirname });
  const result1 = trenchMap(input);
  const result2 = trenchMap(input, 50);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
