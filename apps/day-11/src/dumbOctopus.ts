const surroundingPoints = (y, x) =>
  Array(3)
    .fill(0)
    .flatMap((_, i) =>
      Array(3)
        .fill(0)
        .map((_, j) => [i + y - 1, j + x - 1])
    );

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

    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        handlePoint(y, x);
      }
    }

    while (Object.keys(flashed).length > 0) {
      const justFlashed = { ...flashed };
      flashed = {};
      for (const key in justFlashed) {
        surroundingPoints(...justFlashed[key]).forEach(([y2, x2]) => {
          handlePoint(y2, x2);
        });
      }
    }

    flashCount.push(Object.keys(hasFlashed).length);
  };

  for (let i = 0; i < steps; i++) {
    takeStep();
  }

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
