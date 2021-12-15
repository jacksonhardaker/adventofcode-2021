import {
  extendedPolymerization,
} from './extendedPolymerizationV2';

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.split('\n\n');

describe('extendedPolymerizationV2', () => {
  test('should return the most letter count minus the least letter count after 1 runs', () => {
    expect(extendedPolymerization(input, 1)).toEqual(1);
  });
  test('should return the most letter count minus the least letter count after 1 runs', () => {
    expect(extendedPolymerization(input, 2)).toEqual(5);
  });

  test('should return the most letter count minus the least letter count after 10 runs', () => {
    expect(extendedPolymerization(input, 10)).toEqual(1588);
  });

  test('should return the most letter count minus the least letter count after 40 runs', () => {
    expect(extendedPolymerization(input, 40)).toEqual(2188189693529);
  });
});
