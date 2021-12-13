import { transparentOrigami, printInstructions } from './transparentOrigami';

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`
  .split('\n\n')
  .map((r) => r.split('\n'));


// #####
// #...#
// #...#
// #...#
// #####
const output = `⬜️⬜️⬜️⬜️⬜️
⬜️⬛️⬛️⬛️⬜️
⬜️⬛️⬛️⬛️⬜️
⬜️⬛️⬛️⬛️⬜️
⬜️⬜️⬜️⬜️⬜️`;

describe('transparentOrigami', () => {
  test('should return the expected result', () => {
    const result = transparentOrigami(input, 1);
    expect(result).toEqual(17);
  });

  test('should return the expected result', () => {
    const result = transparentOrigami(input, 2);
    expect(result).toEqual(16);
  });
});

describe('printInstructions', () => {
  test('should print the result', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
    printInstructions(input);
    expect(spy).toHaveBeenCalledWith(output);
    jest.clearAllMocks();
  });
});
