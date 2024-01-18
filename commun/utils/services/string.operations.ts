import { fromArray } from "fp-ts/lib/ReadonlyArray";
import { flow } from "fp-ts/lib/function";

export const join = (glue: string) => (s: string[]) => s.join(glue);
export const match = (regexp: RegExp) => (texte: string) => texte.match(regexp);
export const matchAll = (regexp: RegExp) => (texte: string) =>
  texte.matchAll(regexp);

export const matchAllWith = (regexp: RegExp) =>
  flow(matchAll(regexp), Array.from<RegExpMatchArray>, fromArray);
