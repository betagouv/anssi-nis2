import { fromArray } from "fp-ts/lib/ReadonlyArray";
import { flow } from "fp-ts/lib/function";
import { split, trim } from "fp-ts/lib/string";
import { toLowerCase } from "fp-ts/string";

export const join = (glue: string) => (s: ReadonlyArray<string>) =>
  s.join(glue);

export const replace =
  (searchValue: string | RegExp, replaceValue: string) => (texte: string) =>
    texte.replace(searchValue, replaceValue);

export const match = (regexp: RegExp) => (texte: string) => texte.match(regexp);

export const matchAll = (regexp: RegExp) => (texte: string) =>
  texte.matchAll(regexp);

export const matchAllWith = (regexp: RegExp) =>
  flow(matchAll(regexp), Array.from<RegExpMatchArray>, fromArray);

export const normalize =
  (form: "NFC" | "NFD" | "NFKC" | "NFKD") => (texte: string) =>
    texte.normalize(form);

export const ajoutePrefixe = (prefix: string) => (texte: string) =>
  `${prefix}${texte}`;

export const supprimeAccents = flow(
  normalize("NFD"),
  replace(/[\u0300-\u036f]/g, "")
);

export const supprimeCaracteresSpeciaux = replace(/\W+/g, " ");

export const construitAncre = flow(
  toLowerCase,
  supprimeAccents,
  supprimeCaracteresSpeciaux,
  trim,
  split(/[\s.]+/),
  join("-"),
  ajoutePrefixe("#")
);
