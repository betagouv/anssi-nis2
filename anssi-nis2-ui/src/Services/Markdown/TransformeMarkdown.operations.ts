import { flow } from "fp-ts/lib/function";
import { replace, split, trim } from "fp-ts/lib/string";
import { filter, reduce } from "fp-ts/ReadonlyArray";
import { parse } from "yaml";
import { matchAllWith } from "../../../../commun/utils/services/string.operations.ts";
import {
  ExtractionSection,
  StructureMarkdown,
} from "./Markdown.declarations.ts";

export const nettoieBrMd = replace("  \n", " ");
export const separeMarkdownParLignes = split("---");

const regexFrontMatterSections =
  /---\n([\w\s\n&'’?:.;,éè]+)\n\s*---\n\s*(#+)([^\n]+)\n/g;
const reduitTuplesChamps = reduce(
  [],
  (acc: ReadonlyArray<string[]>, m: ReadonlyArray<string>) => [
    ...acc,
    [trim(m[1]), trim(m[2]), trim(m[3])],
  ],
);

import { Plugin } from "unified";
import { Literal, Parent } from "unist";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { Heading, Text } from "mdast";

export const extraitFrontMatterSectionsBrute = flow(
  matchAllWith(regexFrontMatterSections),
  reduitTuplesChamps,
);

const fabriqueInformationsTitre = (noeud: Heading) => {
  return {
    titre: (noeud.children[0] as Text).value,
    niveau: noeud.depth,
  };
};

const isHeading = (n: Literal<string> | Heading): n is Heading =>
  n !== undefined && n.type === "heading";

const ajouteSection =
  (acc: StructureMarkdown) => (nouvelleSection: ExtractionSection) => ({
    ...acc,
    sections: [...acc.sections, nouvelleSection],
  });

const filtre = (listeTypesFiltre: string[]) =>
  filter((c: Literal<string>) => listeTypesFiltre.includes(c.type));
const filtreYamlHeading = filtre(["yaml", "heading"]);

function ajouteUneSection(
  acc: StructureMarkdown,
  yamlParse: ExtractionSection,
  noeudSuivant: Heading,
) {
  const nouvelleSection = {
    ...yamlParse,
    ...fabriqueInformationsTitre(noeudSuivant),
  };
  return ajouteSection(acc)(nouvelleSection);
}

function ajouteMatter(acc: StructureMarkdown, yamlParse: ExtractionSection) {
  return { ...acc, ...yamlParse };
}

function ajouteYaml(
  acc: StructureMarkdown,
  node: Literal<string>,
  i: number,
  a: readonly Literal<string>[],
) {
  const yamlParse = parse(node.value);
  const noeudSuivant = a[i + 1];
  return isHeading(noeudSuivant)
    ? ajouteUneSection(acc, yamlParse, noeudSuivant)
    : ajouteMatter(acc, yamlParse);
}

const id = <T>(acc: T) => acc;

// const accumulateurMatiere = flow();

const extraitMatiere: Plugin<[], Parent<Literal<string>>> =
  () => (tree, file) => {
    const nodes = filtreYamlHeading(tree.children);
    file.data.frontmatter = nodes.reduce(
      (acc: StructureMarkdown, node, i, a) =>
        node.type === "yaml" ? ajouteYaml(acc, node, i, a) : id(acc),
      { sections: [] },
    );
  };

const processeurMd = remark()
  .use(remarkFrontmatter, { marker: "-", type: "yaml", anywhere: true })
  .use(extraitMatiere);

export const extraitFrontMatter = (texte: string): StructureMarkdown => {
  const mdast = processeurMd.processSync(texte);
  return mdast.data.frontmatter as StructureMarkdown;
};
