export const takeSteps = (input: number[][], steps: number) => {
  const octopuses = input.map((row) => [...row]);
  const flashCount = [];

  const takeStep = () => {
    const hasFlashed = {};
    let flashed: { [key: string]: [number, number] } = {};

    const handlePoint = (y, x) => {
      if (octopuses?.[y]?.[x] === 9) {
        flashed[`${y},${x}`] = [y, x];
        hasFlashed[`${y},${x}`] = true;
        octopuses[y][x] = 0;
      } else if (
        octopuses?.[y]?.[x] !== undefined &&
        !hasFlashed[`${y},${x}`]
      ) {
        octopuses[y][x]++;
      }
    };

    const forRange = (y1, y2, x1, x2) => {
      for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
          handlePoint(y, x);
        }
      }
    };

    forRange(0, octopuses.length, 0, octopuses[0].length);

    while (Object.keys(flashed).length > 0) {
      const justFlashed = { ...flashed };
      flashed = {};
      for (const key in justFlashed) {
        forRange(
          justFlashed[key][0] - 1,
          justFlashed[key][0] + 2,
          justFlashed[key][1] - 1,
          justFlashed[key][1] + 2
        );
      }
    }

    flashCount.push(Object.keys(hasFlashed).length);
  };

  Array(steps).fill(0).forEach(takeStep);

  return {
    octopuses,
    flashCount,
    allFlashed: flashCount.slice(-1)[0] === 100,
  };
};

export const dumbOctopus = (input: number[][], steps = 100) =>
  takeSteps(input, steps).flashCount.reduce((acc, val) => acc + val, 0);

export const dumbOctopusSync = (input: number[][]) => {
  let results = takeSteps(input, 1);
  let stepsTaken = 1;
  while (!results.allFlashed) {
    results = takeSteps(results.octopuses, 1);
    stepsTaken++;
  }

  return stepsTaken;
};
