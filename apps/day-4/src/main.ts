import { readFile } from '@adventofcode-2021/util-io';
import { giantSquid, letTheSquidWin } from './giantSquid';

(async () => {
  const input = await readFile('assets/input.txt', { root: __dirname });
  const result1 = giantSquid(input);
  const result2 = letTheSquidWin(input);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
