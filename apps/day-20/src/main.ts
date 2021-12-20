import { readFile } from '@adventofcode-2021/util-io';
import { trenchMap } from './trenchMap';

(async () => {
  const input = await readFile('assets/input.txt', { root: __dirname });
  const result1 = trenchMap(input);

  console.log(`part 1: ${result1}`);
})();
