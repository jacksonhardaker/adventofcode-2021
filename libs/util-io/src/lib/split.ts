export type Delimiter = '\n' | ',' | string;

export const split = (input: string, options?: { delimiter: Delimiter }) => {
  const { delimiter = '\n' } = options || {};

  return input.split(delimiter);
};
