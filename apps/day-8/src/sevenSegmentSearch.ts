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
    const matches = entry
      .match(/[a-z]{2,7}/g)
      .map((p) => Array.from(p).sort().join(''));
    const patterns = matches.slice(0, 10);
    const values = matches.slice(10, 14);

    return [patterns, values];
  });

  const includesAllFrom = (from, p) =>
    Array.from(from).every((c) => p.includes(c));

  const hasLengthN = (length) => (p) => p.length === length;

  return parsedInput.reduce((sum, [patterns, values]) => {
    const [one, four, seven, eight] = [2, 4, 3, 7].map((length) =>
      patterns.find(hasLengthN(length))
    );

    // if 5 chars AND includes ALL from 1 === 3
    const three = patterns.find(
      (p) => hasLengthN(5)(p) && includesAllFrom(one, p)
    );

    // if 6 chars AND includes ALL from 4 === 9
    const nine = patterns.find(
      (p) => hasLengthN(6)(p) && includesAllFrom(four, p)
    );

    // if 6 chars AND includes ALL but 1 from 9 AND the letter NOT in 9 exists in all 5 char patterns === 0
    const zero = patterns.find(
      (p) =>
        hasLengthN(6)(p) &&
        p !== nine &&
        patterns
          .filter((p2) => hasLengthN(5)(p2))
          .every((p3) =>
            p3.includes(Array.from(nine).find((c) => !p.includes(c)))
          )
    );

    // if 6 chars AND is NOT 9 or 0 === 6
    const six = patterns.find(
      (p) => hasLengthN(6)(p) && p !== nine && p !== zero
    );

    // if 5 chars AND 9 includes all chars AND is not 3 === 5
    const five = patterns.find(
      (p) => hasLengthN(5)(p) && includesAllFrom(p, nine) && p !== three
    );

    // if 5 chars AND is NOT 3 or 5 === 2
    const two = patterns.find(
      (p) => hasLengthN(5)(p) && p !== three && p !== five
    );

    const value = Number(
      values.reduce(
        (num, val) =>
          num +
          [
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
          ].findIndex((p) => p === val),
        ''
      )
    );

    return (sum += value);
  }, 0);
};
