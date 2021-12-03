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
  const stats = createBitMap(input);

  const bitPositions = Object.values(stats);
  
  let oxygenRatingList = [...input];
  let co2RatingList = [...input];
  for (let i = 0; i < bitPositions.length; i++) {
    if (oxygenRatingList.length > 1) {
      oxygenRatingList = oxygenRatingList.filter(
        (binary) => binary[i] === bitPositions[i].gammaRate
      );
    }

    if (co2RatingList.length > 1) {
      co2RatingList = co2RatingList.filter(
        (binary) => binary[i] === bitPositions[i].epsilonRate
      );
    }

    if (oxygenRatingList.length === 1 && co2RatingList.length === 1) {
      break;
    }
  }

  const [oxygenRating] = oxygenRatingList;
  const [co2Rating] = co2RatingList;

  console.log({ oxygenRating, co2Rating});


  return Number.parseInt(oxygenRating, 2) * Number.parseInt(co2Rating, 2);
};
