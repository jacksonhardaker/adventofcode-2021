export const sevenSegmentSearch = (input: string[]) => {
  return input.reduce((acc, input) => {
    const matches =
      input
        .split('|')[1]
        .match(
          RegExp(
            [2, 3, 4, 7].map((num) => `(\\b[a-z]{${num}}\\b)`).join('|'),
            'g'
          )
        ) || [];
    return matches.length + acc;
  }, 0);
};

//  aaaa
// b    c
// b    c
//  dddd
// e    f
// e    f
//  gggg

const normalizedMap = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  adbefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

export const part2 = (input: string[]) => {
  const parsedInput = input.map((entry) => {
    const matches = entry.match(/[a-z]{2,7}/g);
    const patterns = matches.slice(0, 10);
    const values = matches.slice(10, 14);

    return [patterns, values];
  });

  parsedInput.forEach(([patterns, values]) => {
    const [one, four, seven, eight] = [2, 4, 3, 7].map((length) =>
      patterns.find((p) => p.length === length)
    );

    // const [top] = Array.from(segments[3].pattern).filter(
    //   (char) => !Array.from(segments[2].pattern).includes(char)
    // );

    // if 5 chars AND includes ALL from 1 === 3
    const three = patterns.find(
      (p) => p.length === 5 && Array.from(one).every((c) => p.includes(c))
    );

    // if 6 chars AND includes ALL from 4 === 9
    const nine = patterns.find(
      (p) => p.length === 6 && Array.from(four).every((c) => p.includes(c))
    );

    // if 6 chars AND includes ALL but 1 from 9 AND the letter NOT in 9 exists in all 5 char patterns === 0
    const zero = patterns.find(
      (p) =>
        p.length === 6 &&
        p !== nine &&
        patterns
          .filter((p2) => p2.length === 5)
          .every((p3) =>
            p3.includes(Array.from(nine).find((c) => !p.includes(c)))
          )
    );

    // if 6 chars AND is NOT 9 or 0 === 6
    const six = patterns.find(
      (p) => p.length === 6 && p !== nine && p !== zero
    );

    // if 5 chars AND 9 includes all chars === 5
    const five = patterns.find(
      (p) => p.length === 5 && Array.from(p).every((c) => nine.includes(c))
    );

    // if 5 chars AND is NOT 3 or 5 === 2
    const two = patterns.find(
      (p) => p.length === 5 && p !== three && p !== five
    );

    console.log({ zero, one, two, three, four, five, six, seven, eight, nine });
  });
};

// acedgfb: 8
// cdfbe: 5
// gcdfa: 2
// fbcad: 3
// dab: 7
// cefabd: 9
// cdfgeb: 6
// eafb: 4
// cagedb: 0
// ab: 1

// 2 chars === 1
// 3 chars === 7
// 4 chars === 4
// 5 chars === 2,3,5
// 6 chars === 0,6,9
// 7 chars === 8

// if 2 chars === 1
// if 3 chars === 7
// if 4 chars === 4
// if 5 chars AND includes ALL from 1 === 3
// if 6 chars AND includes ALL from 4 === 9
// if 6 chars AND includes ALL but 1 from 9 AND the letter NOT in 9 exists in all 5 char patterns === 0
// if 6 chars AND is NOT 9 or 0 === 6
// if 5 chars AND 9 includes all chars === 5
// if 5 chars AND is NOT 3 or 5 === 2

// char from 3 which does NOT exist in 2 === bottom right
// char which does NOT exist in 9 === bottom left
