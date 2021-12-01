import { sonarSweep } from './sonarSweep';

test('should do something cool', () => {
  const input = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ];
  const result = sonarSweep(input);

  expect(result).toEqual(7);
});
