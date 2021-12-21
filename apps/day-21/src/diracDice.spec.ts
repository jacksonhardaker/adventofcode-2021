import { diracDice } from './diracDice';

describe('diracDice', () => {
  test('should return the expected result', () => {
    const input = [
      'Player 1 starting position: 4',
      'Player 2 starting position: 8',
    ];
    const result = diracDice(input);

    expect(result).toEqual(739785);
  });
});

describe('quantumDie', () => {
  test('should return the expected result', () => {
    const input = [
      'Player 1 starting position: 4',
      'Player 2 starting position: 8',
    ];
    const result = diracDice(input);

    expect(result).toEqual(444356092776315);
  });
});
