export const takeSteps = (input: number[][], steps: number) => {
  const octopuses = [...input];
  let flashCount = 0;
  let allFlashed = false;
  // find 9s
  const takeStep = () => {
    const hasFlashed = {};
    let nines = {};
    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        const oct = octopuses[y][x];
        if (oct === 9 && !hasFlashed[`${y},${x}`]) {
          nines[`${y},${x}`] = [y, x];
          hasFlashed[`${y},${x}`] = true;
          octopuses[y][x] = 0;
        } else if (oct < 9 && !hasFlashed[`${y},${x}`]) {
          octopuses[y][x]++;
        }
      }
    }

    while(Object.keys(nines).length > 0) {
      const justFlashed = {...nines};
      nines = {};
      for (const key in justFlashed) {
        const [y,x] = justFlashed[key];
        [
          [y - 1, x -1],
          [y - 1, x],
          [y - 1, x + 1],
          [y, x -1],
          [y, x],
          [y, x + 1],
          [y + 1, x -1],
          [y + 1, x],
          [y + 1, x + 1],
        ].forEach(([y2,x2]) => {
          if (octopuses?.[y2]?.[x2] === 9) {
            octopuses[y2][x2] = 0;
            hasFlashed[`${y2},${x2}`] = true;
            nines[`${y2},${x2}`] = [y2, x2];
          }
          else if (octopuses?.[y2]?.[x2] !== undefined && !hasFlashed[`${y2},${x2}`]) {
            octopuses[y2][x2]++;
          }
        });
      }
    }



    if (Object.keys(hasFlashed).length === octopuses.length * octopuses[0].length) {
      allFlashed = true;
    }

    flashCount += Object.keys(hasFlashed).length;
  };

  for (let i = 0; i < steps; i++) {
    takeStep();
  }

  return { octopuses, flashCount, allFlashed };
};

export const dumbOctopus = (input: number[][], steps = 100) => {
  
  const { flashCount } = takeSteps(input, steps);
  
  return flashCount;
};

export const dumbOctopusSync = (input: number[][]) => {
  
  let results = takeSteps(input, 1);
  let stepsTaken = 1;
  while(!results.allFlashed) {
    results = takeSteps(results.octopuses, 1);
    stepsTaken++;
  }

  return stepsTaken;
}
