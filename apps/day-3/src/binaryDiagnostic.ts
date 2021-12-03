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

export const oxygenDiagnostic = (input: string[]) => {
  
  let oxygenRatingList = [...input];
  let co2RatingList = [...input];
  for (let i = 0; i < input[0].length; i++) {
    // calculate most/least common bit at position i
    const { 0: oxZeros, 1: oxOnes} = oxygenRatingList.reduce((acc, binary) => {
      acc[binary[i]]++
      return acc;
    }, { 0: 0, 1: 0});

    const { 0: coZeros, 1: coOnes } = co2RatingList.reduce((acc, binary) => {
      acc[binary[i]]++
      return acc;
    }, { 0: 0, 1: 0});

    const oxGammaRate = oxZeros > oxOnes ? '0' : '1';
    const coEpsilonRate = coZeros <= coOnes ? '0' : '1';

    
    if (oxygenRatingList.length > 1) {
      oxygenRatingList = oxygenRatingList.filter(
        (binary) => binary[i] === oxGammaRate
      );
    }

    if (co2RatingList.length > 1) {
      co2RatingList = co2RatingList.filter(
        (binary) => binary[i] === coEpsilonRate
      );
    }

    if (oxygenRatingList.length === 1 && co2RatingList.length === 1) {
      break;
    }
  }

  const [oxygenRating] = oxygenRatingList;
  const [co2Rating] = co2RatingList;

  return Number.parseInt(oxygenRating, 2) * Number.parseInt(co2Rating, 2);
};
