import { extendedPolymerization, parseInput, buildPolymer } from './extendedPolymerization';

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

describe('parseInput', () => {
  test('should split the input into the starting polymer template and the list of pair insertions', () => {
    expect(parseInput(input)).toEqual([
      'NNCB',
      [
        ['CH', 'B'],
        ['HH', 'N'],
        ['CB', 'H'],
        ['NH', 'C'],
        ['HB', 'C'],
        ['HC', 'B'],
        ['HN', 'C'],
        ['NN', 'C'],
        ['BH', 'H'],
        ['NC', 'B'],
        ['NB', 'B'],
        ['BN', 'B'],
        ['BB', 'N'],
        ['BC', 'B'],
        ['CC', 'N'],
        ['CN', 'C'],
      ],
    ]);
  });
});

describe('buildPolymer', () => {
  test.each([
    [1, 'NCNBCHB'],
    [2, 'NBCCNBBBCBHCB'],
    [3, 'NBBBCNCCNBBNBNBBCHBHHBCHB'],
    [4, 'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'],
  ])('should return the expected result after %i step(s)', (steps, result) => {
    expect(buildPolymer(input, steps)).toEqual(result);
  });

  test('should have a length of 97 after 5 steps', () => {
    expect(buildPolymer(input, 5).length).toEqual(97);
  });

  test('should have a length of 3073 after 5 steps', () => {
    expect(buildPolymer(input, 10).length).toEqual(3073);
  });
});
