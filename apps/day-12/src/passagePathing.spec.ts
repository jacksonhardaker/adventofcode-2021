import { passagePathing } from './passagePathing';

describe('passagePathing', () => {
  test.each([
    [['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'], 10],
    [
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
      19,
    ],
    [
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
      226,
    ],
  ])('should return the expected result', (input: string[], expected) => {
    const result = passagePathing(input);

    expect(result.length).toEqual(expected);
  });
});
