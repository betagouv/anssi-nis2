import { map, reduce } from "fp-ts/ReadonlyNonEmptyArray";
import { ReadonlyNonEmptyArray } from "fp-ts/lib/ReadonlyNonEmptyArray";
import { flow } from "fp-ts/lib/function";
import { split } from "fp-ts/lib/string";

export const nettoieBrMd = (texte: string) => texte.replace("  \n", " ");
export const separeMarkdownParLignes = (texteMarkdown: string) =>
  `${texteMarkdown}`.split("---");

const regexFrontMatterBase = /^\s*---\n([\s\S]*?)\n\s*---/;
const regexFrontMatterSections = /---\n([\s\S]*?)\n\s*---\n\s*#+([^\n]+)\n/g;
export const extraitFrontMatterBrute = (texte: string) => {
  const res = texte.match(regexFrontMatterBase);
  return res ? res[1].trim() : "";
};

export const extraitFrontMatterSectionsBrute = (texte: string) =>
  Array.from(texte.matchAll(regexFrontMatterSections)).reduce(
    (acc: string[][], m) => [...acc, [m[1].trim(), m[2].trim()]],
    [],
  );

type FrontMatter = { [key: string]: string };

type StructureMarkdown = {
  sections?: FrontMatter[];
};

const decoupeLignes = split("\n");
const decoupeTousLesChamps = map(split(":"));
const fabriqueChamps = reduce(
  {},
  (acc, couple: ReadonlyNonEmptyArray<string>) => ({
    ...acc,
    ...fabriqueChamp(couple),
  }),
);

const decoupeFrontMatterBrute = flow(
  decoupeLignes,
  decoupeTousLesChamps,
  fabriqueChamps,
);

const extraitSections = (texte: string): { sections?: FrontMatter[] } =>
  extraitFrontMatterSectionsBrute(texte).reduce(
    ({ sections }: StructureMarkdown, elt) => ({
      sections: [
        ...(sections ?? []),
        {
          titre: elt[1],
          ...decoupeFrontMatterBrute(elt[0]),
        },
      ],
    }),
    { sections: [] },
  );
export const extraitFrontMatter = (texte: string): StructureMarkdown => ({
  ...decoupeFrontMatterBrute(extraitFrontMatterBrute(texte)),
  ...extraitSections(texte),
});

const fabriqueChamp = (couple: ReadonlyNonEmptyArray<string>) =>
  couple && couple[0] && couple[1]
    ? { [couple[0].trim()]: couple[1].trim() }
    : {};
