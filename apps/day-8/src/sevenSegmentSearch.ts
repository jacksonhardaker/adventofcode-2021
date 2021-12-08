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

export const part2 = (input: string[]) => {
  const parsedInput = input.map((entry) => {
    const matches = entry.match(/[a-z]{2,7}/g);
    const patterns = matches.slice(0, 10);
    const values = matches.slice(10, 14);

    return [patterns, values];
  });

  const equals = (p1, p2) =>
    p1.length === p2.length && Array.from(p1).every((c) => p2.includes(c));

  const includesAllFrom = (from, p) =>
    Array.from(from).every((c) => p.includes(c));

  const hasLength = (p, length) => p.length === length;

  return parsedInput.reduce((sum, [patterns, values]) => {
    const [one, four, seven, eight] = [2, 4, 3, 7].map((length) =>
      patterns.find((p) => p.length === length)
    );

    // if 5 chars AND includes ALL from 1 === 3
    const three = patterns.find(
      (p) => hasLength(p, 5) && includesAllFrom(one, p)
    );

    // if 6 chars AND includes ALL from 4 === 9
    const nine = patterns.find(
      (p) => hasLength(p, 6) && includesAllFrom(four, p)
    );

    // if 6 chars AND includes ALL but 1 from 9 AND the letter NOT in 9 exists in all 5 char patterns === 0
    const zero = patterns.find(
      (p) =>
        hasLength(p, 6) &&
        !equals(p, nine) &&
        patterns
          .filter((p2) => p2.length === 5)
          .every((p3) =>
            p3.includes(Array.from(nine).find((c) => !p.includes(c)))
          )
    );

    // if 6 chars AND is NOT 9 or 0 === 6
    const six = patterns.find(
      (p) => hasLength(p, 6) && !equals(p, nine) && !equals(p, zero)
    );

    // if 5 chars AND 9 includes all chars === 5
    const five = patterns.find(
      (p) => hasLength(p, 5) && Array.from(p).every((c) => nine.includes(c))
    );

    // if 5 chars AND is NOT 3 or 5 === 2
    const two = patterns.find(
      (p) => hasLength(p, 5) && !equals(p, three) && !equals(p, five)
    );

    const numbers = [
      zero,
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine,
    ];

    const value = values
      .map((value) => {
        return numbers.findIndex((p) => equals(p, value));
      })
      .join('');

    return (sum += Number(value));
  }, 0);

  // return Number(value);
};
