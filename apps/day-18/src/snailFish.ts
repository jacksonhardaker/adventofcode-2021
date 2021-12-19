export type RawSnailNumber = [number | RawSnailNumber, number | RawSnailNumber];
class SnailDigit {
  parent: SnailNumber;
  value: number;
  constructor(value: number, parent: SnailNumber) {
    this.parent = parent;
    this.value = value;
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
    return [
      this.left.toArray(),
      this.right.toArray(),
    ];
  }
}

export const parseNumber = (input: RawSnailNumber) => {
  const root = new SnailNumber(input, 0, null);
  // console.log(JSON.stringify(root.toArray()));
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
export const explode = (root: SnailNumber) => {
  const explodable = root.getExplodable();
  const tails = root.getTails();

  const exploding = explodable[0];
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
  }
  else if (exploding.parent.right === exploding) {
    exploding.parent.right = new SnailDigit(0, exploding.parent);
  }

  return root;
};

export const snailFish = (input: any[]) => {
  return null;
};
