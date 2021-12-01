import { sonarSweep, slidingWindow } from './sonarSweep';

const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe('sonarSweep', () => {
  test('should return the expected result', () => {
    expect(sonarSweep(input)).toEqual(7);
  });
});

describe('slidingWindow', () => {
  test('should return the expected result', () => {
    expect(slidingWindow(input)).toEqual(5);
  });
});
