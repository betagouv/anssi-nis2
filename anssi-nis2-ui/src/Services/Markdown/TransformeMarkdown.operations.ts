import { flow } from "fp-ts/lib/function";
import { replace, split, trim } from "fp-ts/lib/string";
import { map, reduce } from "fp-ts/ReadonlyArray";
import * as O from "fp-ts/Option";
import {
  match,
  matchAllWith,
} from "../../../../commun/utils/services/string.operations.ts";
import { StructureMarkdown } from "./Markdown.declarations.ts";

export const nettoieBrMd = replace("  \n", " ");
export const separeMarkdownParLignes = split("---");

const regexFrontMatterBase = /^\s*---\n([\s\S]*?)\n\s*---/;
const regexFrontMatterSections = /---\n([\s\S]*?)\n\s*---\n\s*#+([^\n]+)\n/g;
const reduitTuplesChamps = reduce(
  [],
  (acc: ReadonlyArray<string[]>, m: ReadonlyArray<string>) => [
    ...acc,
    [trim(m[1]), trim(m[2])],
  ],
);

export const extraitFrontMatterBrute = flow(
  match(regexFrontMatterBase),
  O.fromNullable,
  O.match(
    () => "",
    (r: RegExpMatchArray) => trim(r[1]),
  ),
);

export const extraitFrontMatterSectionsBrute = flow(
  matchAllWith(regexFrontMatterSections),
  reduitTuplesChamps,
);

const fabriqueChamp = (couple: ReadonlyArray<string>) =>
  couple && couple[0] && couple[1]
    ? { [trim(couple[0])]: trim(couple[1]) }
    : {};
const decoupeLignes = split("\n");
const decoupeTousLesChamps = map(split(":"));
const fabriqueChamps = reduce({}, (acc, couple: ReadonlyArray<string>) => ({
  ...acc,
  ...fabriqueChamp(couple),
}));

const decoupeFrontMatterBrute = flow(
  decoupeLignes,
  decoupeTousLesChamps,
  fabriqueChamps,
);

const reduitSectionsBrutes = reduce(
  { sections: [] },
  ({ sections }: StructureMarkdown, elt: ReadonlyArray<string>) => ({
    sections: [
      ...(sections ?? []),
      {
        titre: elt[1],
        ...decoupeFrontMatterBrute(elt[0]),
      },
    ],
  }),
);
const extraitSections = flow(
  extraitFrontMatterSectionsBrute,
  reduitSectionsBrutes,
);
export const extraitFrontMatter = (texte: string): StructureMarkdown => ({
  ...decoupeFrontMatterBrute(extraitFrontMatterBrute(texte)),
  ...extraitSections(texte),
});
