// export type SnailNumber = [number | SnailNumber, number | SnailNumber];

class SnailNumber {
  left: number | SnailNumber;
  right: number | SnailNumber;
  parent: null | SnailNumber;
  depth: number;
  constructor(
    left: number | number[],
    right: number | number[],
    depth: number,
    tails?: Set<SnailNumber>
  ) {
    this.left = Array.isArray(left)
      ? new SnailNumber(left[0], left[1], depth + 1, tails)
      : left;
    this.right = Array.isArray(right)
      ? new SnailNumber(right[0], right[1], depth + 1, tails)
      : right;
    this.depth = depth;

    if (this.left instanceof SnailNumber) {
      this.left.parent = this;
    }
    if (this.right instanceof SnailNumber) {
      this.right.parent = this;
    }

    if (this.depth === 4) {
      tails?.add?.(this);
    }
  }

  update(left: number | SnailNumber, right: number | SnailNumber) {
    Object.assign(this, { left, right });
  }

  closestLeft() {
    return this.parent.left === this ? null : this.parent.left;
  }
  closestRight() {
    return this.parent.right === this ? null : this.parent.right;
  }

  toArray() {
    return [
      this.left instanceof SnailNumber ? this.left.toArray() : this.left,
      this.right instanceof SnailNumber ? this.right.toArray() : this.right,
    ];
  }
}
export const parseNumber = (input: Array<number | number[]>) => {
  const [left, right] = input;
  const tails = new Set<SnailNumber>();
  const root = new SnailNumber(left, right, 0, tails);
  return { root, tails };
};

export const explode = ({
  root,
  tails,
}: {
  root: SnailNumber;
  tails: Set<SnailNumber>;
}) => {
  const [tail] = tails;
  const closestLeft = tail.closestLeft() as number | null;
  const closestRight = tail.closestRight() as number | null;
  const left = closestLeft === null ? 0 : closestLeft + (tail.left as number);
  const right =
    closestRight === null ? 0 : closestRight + (tail.right as number);

  tail.parent.update(left, right);

  tails.delete(tail);

  return { root, tails };
};

export const snailFish = (input: any[]) => {
  parseNumber(input);
  return null;
};
