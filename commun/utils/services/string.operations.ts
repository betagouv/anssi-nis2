import { fromArray } from "fp-ts/lib/ReadonlyArray";
import { flow } from "fp-ts/lib/function";
import { split } from "fp-ts/lib/string";
import { toLowerCase } from "fp-ts/string";

export const join = (glue: string) => (s: ReadonlyArray<string>) =>
  s.join(glue);
export const match = (regexp: RegExp) => (texte: string) => texte.match(regexp);
export const matchAll = (regexp: RegExp) => (texte: string) =>
  texte.matchAll(regexp);

export const matchAllWith = (regexp: RegExp) =>
  flow(matchAll(regexp), Array.from<RegExpMatchArray>, fromArray);

export const ajoutePrefixe = (prefix: string) => (texte: string) =>
  `${prefix}${texte}`;

export const supprimeAccents = (texte: string) =>
  texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const construitAncre = flow(
  toLowerCase,
  supprimeAccents,
  split(/[\s.]+/),
  join("-"),
  ajoutePrefixe("#")
);
