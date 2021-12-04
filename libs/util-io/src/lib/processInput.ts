import { parseArray, Parser } from './parseArray';
import { readFile } from './readFile';
import { Delimiter, split } from './split';

function processInput<T = string>(
  filePath: string,
  {
    root,
    delimiter,
    parser,
  }: { root: string; delimiter?: Delimiter; parser: Parser<T> }
): Promise<T[]>;
function processInput(
  filePath: string,
  {
    root,
    delimiter,
    parser,
  }: { root: string; delimiter?: Delimiter; parser?: never }
): Promise<string[]>;
async function processInput<T = string>(
  filePath: string,
  {
    root,
    delimiter,
    parser,
  }: { root: string; delimiter?: Delimiter; parser?: Parser<T> }
) {
  const arr = split(await readFile(filePath, { root }), { delimiter });
  const result = parser
    ? parseArray(arr, {
        parser,
      })
    : arr;
  return result;
}

export { processInput };
