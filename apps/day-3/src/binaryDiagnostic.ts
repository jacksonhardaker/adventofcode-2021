export const binaryDiagnostic = (input: string[]) => {
  const stats = input.reduce((acc, binary) => {
    const stats = { ...acc };
    binary.split('').forEach((bit, index) => {
      if (!stats[index]) stats[index] = {};

      stats[index][bit] = stats[index][bit] ? stats[index][bit] + 1 : 1

      stats[index].gammaRate = stats[index]['1'] > stats[index]['0'] ? '1' : '0';
      stats[index].epsilonRate = stats[index]['1'] < stats[index]['0'] ? '1' : '0';
    });

    return stats;
  }, {});

  const gammaRate = Number.parseInt(Object.values(stats).map(({ gammaRate }) => gammaRate).join(''), 2);
  const epsilonRate = Number.parseInt(Object.values(stats).map(({ epsilonRate }) => epsilonRate).join(''), 2);

  return gammaRate * epsilonRate;
};
