import { processInput } from '@adventofcode-2021/util-io';
import { sumOfVersions, packetDecoder, evalPackets } from './packetDecoder';

(async () => {
  const [input] = await processInput('assets/input.txt', { root: __dirname });
  const result1 = sumOfVersions(packetDecoder(input));
  const result2 = evalPackets(input);

  console.log(`part 1: ${result1}`);
  console.log(`part 2: ${result2}`);
})();
