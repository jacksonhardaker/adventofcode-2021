export type RawSnailNumber = [number | RawSnailNumber, number | RawSnailNumber];
class SnailDigit {
  parent: SnailNumber;
  value: number;
  constructor(value: number, parent: SnailNumber) {
    this.parent = parent;
    this.value = value;
  }

  getSplitable() {
    return this.value >= 10 ? [this] : [];
  }

  getTails() {
    return [this];
  }

  toArray() {
    return this.value;
  }
}
class SnailNumber {
  left: SnailNumber | SnailDigit;
  right: SnailNumber | SnailDigit;
  parent: null | SnailNumber;
  depth: number;
  constructor(input: RawSnailNumber, depth, parent: null | SnailNumber) {
    const [left, right] = input;
    this.depth = depth;
    this.parent = parent;
    this.left = Array.isArray(left)
      ? new SnailNumber(left, depth + 1, this)
      : new SnailDigit(left, this);
    this.right = Array.isArray(right)
      ? new SnailNumber(right, depth + 1, this)
      : new SnailDigit(right, this);
  }

  getSplitable(): SnailDigit[] {
    return [...this.left.getSplitable(), ...this.right.getSplitable()];
  }

  getExplodable(): SnailNumber[] {
    if (this.depth === 4) return [this];
    return [
      ...(this.left instanceof SnailNumber ? this.left.getExplodable() : []),
      ...(this.right instanceof SnailNumber ? this.right.getExplodable() : []),
    ];
  }

  getTails(): SnailDigit[] {
    return [...this.left.getTails(), ...this.right.getTails()];
  }

  toArray() {
    return [this.left.toArray(), this.right.toArray()];
  }
}

export const parseNumber = (input: RawSnailNumber) => {
  const root = new SnailNumber(input, 0, null);
  return root;
};

/**
 *
 * To explode a pair, the pair's left value is added to the first regular number to the left
 * of the exploding pair (if any), and the pair's right value is added
 * to the first regular number to the right of the exploding pair(if any).
 * Exploding pairs will always consist of two regular numbers.
 * Then, the entire exploding pair is replaced with the regular number 0.
 *
 */
export const explode = (root: SnailNumber, node?: SnailNumber) => {
  const explodable = root.getExplodable();
  const splitableBefore = root.getSplitable();
  const tails = root.getTails();

  const exploding = node || explodable[0];
  const left = tails[tails.indexOf(exploding.left as SnailDigit) - 1];
  const right = tails[tails.indexOf(exploding.right as SnailDigit) + 1];

  if (left && exploding.left instanceof SnailDigit) {
    left.value += exploding.left.value;
  }

  if (right && exploding.right instanceof SnailDigit) {
    right.value += exploding.right.value;
  }

  if (exploding.parent.left === exploding) {
    exploding.parent.left = new SnailDigit(0, exploding.parent);
  } else if (exploding.parent.right === exploding) {
    exploding.parent.right = new SnailDigit(0, exploding.parent);
  }

  const splitableAfter = root.getSplitable();

  const [newSplit] = splitableAfter.filter((digit) => !splitableBefore.includes(digit));
  if (newSplit) {
    split(root, newSplit);
  }

  return root;
};

/**
 * To split a regular number, replace it with a pair; the left element of the pair should be the
 * regular number divided by two and rounded down, while the right element of the pair should be
 * the regular number divided by two and rounded up. For example, 10 becomes [5,5], 11 becomes
 * [5,6], 12 becomes [6,6], and so on.
 */
export const split = (root: SnailNumber, node?: SnailDigit) => {
  const explodableBefore = root.getExplodable();
  const splitting = node || root.getSplitable()[0];

  const replacement = new SnailNumber(
    [Math.floor(splitting.value / 2), Math.ceil(splitting.value / 2)],
    splitting.parent.depth + 1,
    splitting.parent
  );
  if (splitting.parent.left === splitting) {
    splitting.parent.left = replacement;
  } else if (splitting.parent.right === splitting) {
    splitting.parent.right = replacement;
  }

  const explodableAfter = root.getExplodable();
  const [newExplode] = explodableAfter.filter((digit) => !explodableBefore.includes(digit));
  if (newExplode) {
    explode(root, newExplode);
  }

  return root;
};

export const add = (a: RawSnailNumber, b: RawSnailNumber) => {
  const sum: RawSnailNumber = [a, b];

  const root = parseNumber(sum);

  while (root.getExplodable().length > 0 || root.getSplitable().length > 0) {
    while (root.getExplodable().length > 0) {
      explode(root);
    }
    while (root.getSplitable().length > 0) {
      split(root);
    }
  }

  return root;
};

export const snailFish = (input: RawSnailNumber[]) => {
  return input.reduce((acc, num) => {
    if (!acc) return num;

    const root = add(acc, num);
    return root.toArray();
  }, null);
};
