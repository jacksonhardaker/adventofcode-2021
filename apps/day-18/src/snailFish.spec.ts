import {
  snailFish,
  parseNumber,
  RawSnailNumber,
  SnailNumber,
  explode,
  split,
  add,
} from './snailFish';

const log = (result) => result instanceof SnailNumber ? JSON.stringify(result.toArray()) : JSON.stringify(result);

describe('explode', () => {
  test.each([
    [
      [9,[[[[1,1],2],3],4]],
      [[5,5],[[[0,3],3],4]]
    ],
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
      [1,[2,[3,[4,11]]]],
      [1,[2,[3,[9,0]]]],
    ],
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

  test.only.each([
    // [
    //   [[[[4,3],4],4],[7,[[8,4],9]]],
    //   [1,1],
    //   [[[[0,7],4],[[7,8],[6,0]]],[8,1]]
    // ],
    [
      [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],
      [7,[[[3,7],[4,3]],[[6,3],[8,8]]]],
      [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]],

    ]
  ] as RawSnailNumber[][])('should add then reduce the given snail numbers', (a,b,expected) => {
    const result = add(a,b);
    expect(log(result)).toEqual(log(expected));
  })
})

describe('snailFish', () => {
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

  test('should return the expected result', () => {
    const input: RawSnailNumber[] = [
      [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],
      [7,[[[3,7],[4,3]],[[6,3],[8,8]]]],
      [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]],
      [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]],
      [7,[5,[[3,8],[1,4]]]],
      [[2,[2,2]],[8,[8,1]]],
      [2,9],
      [1,[[[9,3],9],[[9,0],[0,7]]]],
      [[[5,[7,4]],7],1],
      [[[[4,2],2],6],[8,7]],
    ];
    const result = snailFish(input);

    expect(log(result)).toEqual('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');
  });
});
