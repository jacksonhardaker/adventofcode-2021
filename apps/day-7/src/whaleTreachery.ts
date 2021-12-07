type HorizontalPosition = number;
type SubmarineCount = number;
type CrabAggregate = [HorizontalPosition, SubmarineCount];
type CrabAggregateHash = Record<HorizontalPosition, CrabAggregate>;

export const whaleTreachery = (input: number[], constantFuelUsage = true) => {
  const aggregateHash = input.reduce(
    (acc, position) => ({
      ...acc,
      [position]: [position, acc[position] ? acc[position][1] + 1 : 1],
    }),
    {} as CrabAggregateHash
  );

  const aggregate = Object.values(aggregateHash);

  const uniqueHorizontalPositions = aggregate.map(([p]) => p);
  const largestPosition = Math.max(...uniqueHorizontalPositions);
  const smallestPosition = Math.min(...uniqueHorizontalPositions);

  let minfuel = Infinity;
  for (let i = smallestPosition; i <= largestPosition; i++) {
    const fuelUsed = aggregate.reduce(
      (fuelUsed, [position, submarineCount]) => {
        if (position !== i) {
          const delta = Math.abs(position - i);
          if (constantFuelUsage) {
            return fuelUsed + delta * submarineCount;
          } else {
            let fuelRequired = 0;
            for (let j = 1; j <= delta; j++) {
              fuelRequired += j * submarineCount;
            }
            return fuelUsed + fuelRequired;
          }
        } else {
          return fuelUsed;
        }
      },
      0
    );

    minfuel = Math.min(minfuel, fuelUsed);
  }

  return minfuel;
};
