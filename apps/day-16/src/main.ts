import { processInput } from '@adventofcode-2021/util-io';
import { packetDecoder } from './packetDecoder';

(async () => {
  const input = await processInput('assets/input.txt', { root: __dirname });
  const result1 = packetDecoder(input);

  console.log(`part 1: ${result1}`);
})();
