type Stats = Record<
  number,
  {
    0: number;
    1: number;
    gammaRate?: '1' | '0';
    epsilonRate?: '1' | '0';
  }
>;

const createBitMap = (input: string[]) => {
  const stats = input.reduce((acc, binary) => {
    const stats = { ...acc };
    binary.split('').forEach((bit, index) => {
      if (!stats[index]) stats[index] = { '0': 0, '1': 0 };

      stats[index][bit] = stats[index][bit] ? stats[index][bit] + 1 : 1;

      stats[index].gammaRate =
        stats[index]['1'] >= stats[index]['0'] ? '1' : '0';
      stats[index].epsilonRate =
        stats[index]['1'] < stats[index]['0'] ? '1' : '0';
    });

    return stats;
  }, {} as Stats);

  return stats;
};

export const binaryDiagnostic = (input: string[]) => {
  const stats = createBitMap(input);

  const gammaRate = Number.parseInt(
    Object.values(stats)
      .map(({ gammaRate }) => gammaRate)
      .join(''),
    2
  );
  const epsilonRate = Number.parseInt(
    Object.values(stats)
      .map(({ epsilonRate }) => epsilonRate)
      .join(''),
    2
  );

  return gammaRate * epsilonRate;
};

const reduceBy = (input: string[], criteria: 'gamma' | 'epsilon') => {
  const rateByCriteria = {
    gamma: (zeros, ones) => (zeros > ones ? '0' : '1'),
    epsilon: (zeros, ones) => (zeros <= ones ? '0' : '1'),
  };

  let inputClone = [...input];
  for (let i = 0; i < inputClone[0].length; i++) {
    if (inputClone.length === 1) break;

    const { 0: zeros, 1: ones } = inputClone.reduce(
      (acc, binary) => {
        acc[binary[i]]++;
        return acc;
      },
      { 0: 0, 1: 0 }
    );

    inputClone = inputClone.filter(
      (binary) => binary[i] === rateByCriteria[criteria](zeros, ones)
    );
  }

  return Number.parseInt(inputClone[0], 2);
};

export const oxygenDiagnostic = (input: string[]) => {
  const oxygenRating = reduceBy(input, 'gamma');
  const co2Rating = reduceBy(input, 'epsilon');

  return oxygenRating * co2Rating;
};
