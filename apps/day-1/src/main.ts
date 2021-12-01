import { processInput } from '@adventofcode-2021/util-io';
import { sonarSweep } from './sonarSweep';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result = sonarSweep(input);

  console.log(result);
})();
