import { passagePathing, passagePathing2 } from './passagePathing';

const inputs = [
  ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'],
  [
    'dc-end',
    'HN-start',
    'start-kj',
    'dc-start',
    'dc-HN',
    'LN-dc',
    'HN-end',
    'kj-sa',
    'kj-HN',
    'kj-dc',
  ],
  [
    'fs-end',
    'he-DX',
    'fs-he',
    'start-DX',
    'pj-DX',
    'end-zg',
    'zg-sl',
    'zg-pj',
    'pj-he',
    'RW-he',
    'fs-DX',
    'pj-RW',
    'zg-RW',
    'start-pj',
    'he-WI',
    'zg-he',
    'pj-fs',
    'start-RW',
  ],
];

describe('passagePathing', () => {
  test.each([
    [inputs[0], 10],
    // [inputs[1], 19],
    // [inputs[2], 226],
  ])(
    'should return the expected result using part 1 rules',
    (input: string[], expected) => {
      const result = passagePathing(input);

      expect(result.length).toEqual(expected);
    }
  );
});

//     start
//     /   \
// c--A-----b--d
//     \   /
//     end

describe('passagePathing', () => {
  test.each([
    // [inputs[0], 36],
    // [inputs[1], 103],
    // [inputs[2], 3509],
  ])(
    'should return the expected result using part 2 rules',
    (input: string[], expected) => {
      const result = passagePathing2(input);
      // console.log(
      //   result.map((path) => path.map((cave) => cave.name).join(','))
      // );

      expect(result.length).toEqual(expected);
    }
  );
});
