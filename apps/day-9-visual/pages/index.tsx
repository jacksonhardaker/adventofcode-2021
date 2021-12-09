import { useEffect, useMemo, useState } from 'react';
import { data as input } from '../public/input';

// const input = [
//   [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
//   [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
//   [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
//   [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
//   [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
// ];

const Cell = ({
  value,
  isLowPoint,
  isBasin,
}: {
  value: number;
  isLowPoint?: boolean;
  isBasin?: boolean;
}) => {
  return (
    <div>
      <style jsx>{`
        div {
          background-color: ${isLowPoint
            ? '#470206'
            : isBasin
            ? '#630407'
            : '#101723'};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      {value}
    </div>
  );
};

const useLowPoints = (input: number[][]) => {
  const [lowPoints, setLowPoints] = useState([]);

  useEffect(() => {
    let timeoutInterval = 1000;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        const surrounding = [
          [y - 1, x],
          [y + 1, x],
          [y, x - 1],
          [y, x + 1],
        ].map(([yy, xx]) => input?.[yy]?.[xx] ?? Infinity);

        if (surrounding.every((point) => input[y][x] < point)) {
          setTimeout(() => {
            setLowPoints((points) => [...points, [x, y]]);
          }, timeoutInterval);
          timeoutInterval += 1000;
        }
      }
    }
  }, [input]);

  return lowPoints;
};

const useSmokeBasin = (lowPoints: [number, number][]) => {
  const [basinCells, setBasinCells] = useState([]);
  useEffect(() => {
    const traverse = async (x: number, y: number, visited = {}) => {
      visited[`${x},${y}`] = true;
  
      if ([9, undefined].includes(input?.[y]?.[x])) return null;
  
      setBasinCells((b) => [...b, [x, y]]);
  
      const visit = ([x2, y2]: [number, number]) => {
        if (!visited[`${x2},${y2}`]) {
          traverse(x2, y2, visited);
        }
      };
  
      (
        [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ] as [number, number][]
      ).forEach((coords) => visit(coords), 1);
    };
  
    lowPoints.map(([x, y]) => traverse(x, y));
  }, [lowPoints]);

  return basinCells;
};

const Grid = ({
  input,
  cellSize = '30px',
}: {
  input: number[][];
  cellSize?: `${number}px`;
}) => {
  const lowPoints = useLowPoints(input);
  const basins = useSmokeBasin(lowPoints);

  return (
    <div className="grid">
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(${input[0].length}, ${cellSize});
          grid-template-rows: repeat(${input.length}, ${cellSize});
        }
      `}</style>
      {input.map((row, y) =>
        row.map((value, x) => (
          <Cell
            key={`${x},${y}`}
            isLowPoint={lowPoints.find(([x2, y2]) => x === x2 && y === y2)}
            isBasin={!!basins.find(([x2, y2]) => x === x2 && y === y2)}
            value={value}
          />
        ))
      )}
    </div>
  );
};

export function Index() {
  return (
    <div>
      <style jsx>{``}</style>
      <Grid input={input} />
    </div>
  );
}

export default Index;
