import { dumbOctopus, dumbOctopusSync, takeSteps } from './dumbOctopus';
const input = [
  [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
  [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
  [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
  [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
  [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
  [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
  [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
  [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
  [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
  [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
];
describe('takeSteps', () => {
  test('should return the expected octopus grid after 1 step', () => {
    const { octopuses } = takeSteps(input, 1);
    expect(octopuses).toEqual([
      [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
      [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
      [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
      [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
      [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
      [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
      [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
      [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
      [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
      [6, 3, 9, 4, 8, 6, 2, 6, 3, 7],
    ]);
  });

  test('should return the expected octopus grid after 2 steps', () => {
    const { octopuses } = takeSteps(input, 2);
    expect(octopuses).toEqual([
      [8, 8, 0, 7, 4, 7, 6, 5, 5, 5],
      [5, 0, 8, 9, 0, 8, 7, 0, 5, 4],
      [8, 5, 9, 7, 8, 8, 9, 6, 0, 8],
      [8, 4, 8, 5, 7, 6, 9, 6, 0, 0],
      [8, 7, 0, 0, 9, 0, 8, 8, 0, 0],
      [6, 6, 0, 0, 0, 8, 8, 9, 8, 9],
      [6, 8, 0, 0, 0, 0, 5, 9, 4, 3],
      [0, 0, 0, 0, 0, 0, 7, 4, 5, 6],
      [9, 0, 0, 0, 0, 0, 0, 8, 7, 6],
      [8, 7, 0, 0, 0, 0, 6, 8, 4, 8],
    ]);
  });

  test('should return the expected octopus grid after 3 steps', () => {
    const { octopuses } = takeSteps(input, 3);
    expect(octopuses).toEqual([
      [0, 0, 5, 0, 9, 0, 0, 8, 6, 6],
      [8, 5, 0, 0, 8, 0, 0, 5, 7, 5],
      [9, 9, 0, 0, 0, 0, 0, 0, 3, 9],
      [9, 7, 0, 0, 0, 0, 0, 0, 4, 1],
      [9, 9, 3, 5, 0, 8, 0, 0, 6, 3],
      [7, 7, 1, 2, 3, 0, 0, 0, 0, 0],
      [7, 9, 1, 1, 2, 5, 0, 0, 0, 9],
      [2, 2, 1, 1, 1, 3, 0, 0, 0, 0],
      [0, 4, 2, 1, 1, 2, 5, 0, 0, 0],
      [0, 0, 2, 1, 1, 1, 9, 0, 0, 0],
    ]);
  });

  test('should return the expected octopus grid after 10 steps', () => {
    const { octopuses } = takeSteps(input, 10);
    expect(octopuses).toEqual([
      [0, 4, 8, 1, 1, 1, 2, 9, 7, 6],
      [0, 0, 3, 1, 1, 1, 2, 0, 0, 9],
      [0, 0, 4, 1, 1, 1, 2, 5, 0, 4],
      [0, 0, 8, 1, 1, 1, 1, 4, 0, 6],
      [0, 0, 9, 9, 1, 1, 1, 3, 0, 6],
      [0, 0, 9, 3, 5, 1, 1, 2, 3, 3],
      [0, 4, 4, 2, 3, 6, 1, 1, 3, 0],
      [5, 5, 3, 2, 2, 5, 2, 3, 5, 0],
      [0, 5, 3, 2, 2, 5, 0, 6, 0, 0],
      [0, 0, 3, 2, 2, 4, 0, 0, 0, 0],
    ]);
  });

  test('should return the expected octopus grid after 193 steps', () => {
    const { octopuses } = takeSteps(input, 193);
    expect(octopuses).toEqual([
      [5, 8, 7, 7, 7, 7, 7, 7, 7, 7],
      [8, 8, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    ]);
  });
});

describe('dumbOctopus', () => {
  test('should return the aggregate number of flashes after 100 steps', () => {
    const result = dumbOctopus(input, 100);

    expect(result).toEqual(1656);
  });
});

describe('dumbOctopusSync', () => {
  test('should return the step in which all octopuses sync', () => {
    const result = dumbOctopusSync(input);

    expect(result).toEqual(195);
  });
});
