import { Heading, Text } from "mdast";
import { Plugin } from "unified";
import { Literal, Parent } from "unist";
import { parse } from "yaml";
import {
  ExtractionSection,
  StructureMarkdown,
} from "./Markdown.declarations.ts";

const fabriqueInformationsTitre = (noeud: Heading) => ({
  titre: (noeud.children[0] as Text).value,
  niveau: noeud.depth,
});
const isHeading = (n: Literal | Heading): n is Heading =>
  n !== undefined && n.type === "heading";
const ajouteSection =
  (acc: StructureMarkdown) => (nouvelleSection: ExtractionSection) => ({
    ...acc,
    sections: [...acc.sections, nouvelleSection],
  });

const filtreLiteral: (
  predicate: (l: Literal) => boolean,
) => (bs: Literal[]) => Literal[] =
  (predicate: (l: Literal) => boolean) => (bs: Literal[]) =>
    bs.filter(predicate);
const filtre = (listeTypesFiltre: string[]) =>
  filtreLiteral((c: Literal) => listeTypesFiltre.includes(c.type));

const filtreYamlHeading = filtre(["yaml", "heading"]);
const ajouteUneSection = (
  acc: StructureMarkdown,
  yamlParse: ExtractionSection,
  noeudSuivant: Heading,
) =>
  ajouteSection(acc)({
    ...yamlParse,
    ...fabriqueInformationsTitre(noeudSuivant),
  });
const ajouteMatter = (
  acc: StructureMarkdown,
  yamlParse: ExtractionSection,
) => ({ ...acc, ...yamlParse });
const ajouteYaml = (
  acc: StructureMarkdown,
  node: Literal,
  i: number,
  a: readonly Literal[],
) => {
  const aElement = a[i + 1];
  return isHeading(aElement)
    ? ajouteUneSection(acc, parse(node.value as string), aElement as Heading)
    : ajouteMatter(acc, parse(node.value as string));
};
const creeMatiereAvecTitre = (
  acc: StructureMarkdown,
  node: Literal,
  i: number,
  a: readonly Literal[],
) =>
  (i === 0 || isHeading(a[i - 1])) && isHeading(node)
    ? ajouteSection(acc)(fabriqueInformationsTitre(node))
    : acc;
const accumulateurMatiere = (
  acc: StructureMarkdown,
  node: Literal,
  i: number,
  a: readonly Literal[],
) =>
  node.type === "yaml"
    ? ajouteYaml(acc, node, i, a)
    : creeMatiereAvecTitre(acc, node, i, a);
export const extraitMatiere: Plugin<[], Parent> = () => (tree, file) => {
  file.data.frontmatter = filtreYamlHeading(tree.children as Literal[]).reduce(
    accumulateurMatiere,
    { sections: [] },
  );
};
