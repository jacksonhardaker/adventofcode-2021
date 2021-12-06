export const lanternfish = (input: number[], days = 80) => {
  const aggregate = input.reduce((acc, timer) => {
    acc[timer]++;
    return acc;
  }, Array(9).fill(0));

  let d = 0;
  while(d < days) {

    const spawnCount = aggregate.shift();
    aggregate[6] += spawnCount;
    aggregate[8] = spawnCount;

    d++;
  }


  const total = aggregate.reduce((acc, num) => acc + num, 0);
  return total;
};
