import { parseInput, trickShot } from './trickShot';

describe('parseInput', () => {
  test('should parse the x and y coords ranges from the input', () => {
    const input = 'target area: x=20..30, y=-10..-5';
    expect(parseInput(input)).toEqual({
      x1: 20,
      x2: 30,
      y1: -10,
      y2: -5,
    });
  });
});

describe('trickShot', () => {
  test('should return the expected result', () => {
    const input = 'target area: x=20..30, y=-10..-5';
    const result = trickShot(parseInput(input));
    expect(result).toEqual(45);
  });
});
