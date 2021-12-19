import {
  snailFish,
  parseNumber,
  RawSnailNumber,
  explode,
  split,
  add,
} from './snailFish';

describe('explode', () => {
  test.each([
    [
      [[[[[9, 8], 1], 2], 3], 4],
      [[[[0, 9], 2], 3], 4],
    ],
    [
      [7, [6, [5, [4, [3, 2]]]]],
      [7, [6, [5, [7, 0]]]],
    ],
    [
      [[6, [5, [4, [3, 2]]]], 1],
      [[6, [5, [7, 0]]], 3],
    ],
    [
      [
        [3, [2, [1, [7, 3]]]],
        [6, [5, [4, [3, 2]]]],
      ],
      [
        [3, [2, [8, 0]]],
        [9, [5, [4, [3, 2]]]],
      ],
    ],
    [
      [
        [3, [2, [8, 0]]],
        [9, [5, [4, [3, 2]]]],
      ],
      [
        [3, [2, [8, 0]]],
        [9, [5, [7, 0]]],
      ],
    ],
  ] as RawSnailNumber[][])(
    'should explode the snailnumber as expected',
    (input, expected) => {
      expect(explode(parseNumber(input)).toArray()).toEqual(expected);
    }
  );
});

describe('split', () => {
  test.each([
    [
      [10, 1],
      [[5, 5], 1],
    ],
    [
      [11, 1],
      [[5, 6], 1],
    ],
    [
      [[[[0, 7], 4],[15, [0, 13]]],[1, 1]],
      [[[[0, 7], 4],[[7, 8],[0, 13]]],[1, 1]],
    ],
  ] as RawSnailNumber[][])(
    'should split the snailnumber as expected',
    (input, expected) => {
      expect(split(parseNumber(input)).toArray()).toEqual(expected);
    }
  );
});

describe('add', () => {
  test.each([
    [
      [[[[4,3],4],4],[7,[[8,4],9]]],
      [1,1],
      [[[[0,7],4],[[7,8],[6,0]]],[8,1]]
    ]
  ] as RawSnailNumber[][])('should add then reduce the given snail numbers', (a,b,expected) => {
    const result = add(a,b);
    expect(result.toArray()).toEqual(expected);
  })
})

describe.only('snailFish', () => {
  test('should return the expected result', () => {
    const input: RawSnailNumber[] = [
      [1,1],
      [2,2],
      [3,3],
      [4,4],
    ];
    const result = snailFish(input);

    expect(result).toEqual([[[[1,1],[2,2]],[3,3]],[4,4]]);
  });

  test('should return the expected result', () => {
    const input: RawSnailNumber[] = [
      [1,1],
      [2,2],
      [3,3],
      [4,4],
      [5,5],
    ];
    const result = snailFish(input);

    expect(result).toEqual([[[[3,0],[5,3]],[4,4]],[5,5]]);
  });

  test('should return the expected result', () => {
    const input: RawSnailNumber[] = [
      [1,1],
      [2,2],
      [3,3],
      [4,4],
      [5,5],
      [6,6],
    ];
    const result = snailFish(input);

    expect(result).toEqual([[[[5,0],[7,4]],[5,5]],[6,6]]);
  });
});
