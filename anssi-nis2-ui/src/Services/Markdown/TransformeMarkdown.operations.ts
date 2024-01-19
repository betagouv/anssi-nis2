import { flow } from "fp-ts/lib/function";
import { replace, split, trim } from "fp-ts/lib/string";
import * as O from "fp-ts/Option";
import { map, reduce } from "fp-ts/ReadonlyArray";
import {
  match,
  matchAllWith,
} from "../../../../commun/utils/services/string.operations.ts";
import {
  ExtractionSection,
  StructureMarkdown,
} from "./Markdown.declarations.ts";

export const nettoieBrMd = replace("  \n", " ");
export const separeMarkdownParLignes = split("---");

const regexFrontMatterBase = /^\s*---\n([\w\s\n:.]+)\n\s*---/;
const regexFrontMatterSections =
  /---\n([\w\s\n:.]+)\n\s*---\n\s*(#+)([^\n]+)\n/g;
const reduitTuplesChamps = reduce(
  [],
  (acc: ReadonlyArray<string[]>, m: ReadonlyArray<string>) => [
    ...acc,
    [trim(m[1]), trim(m[2]), trim(m[3])],
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

const fabriqueSection = (elt: ReadonlyArray<string>): ExtractionSection => ({
  titre: elt[2],
  niveau: elt[1].length,
  ...decoupeFrontMatterBrute(elt[0]),
});

const reduitSectionsBrutes = reduce(
  { sections: [] },
  ({ sections }: StructureMarkdown, elt: ReadonlyArray<string>) => ({
    sections: [...sections, fabriqueSection(elt)],
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
