import { filter } from "fp-ts/lib/ReadonlyArray";
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
  node: Literal<string>,
  i: number,
  a: readonly Literal<string>[],
) =>
  isHeading(a[i + 1])
    ? ajouteUneSection(acc, parse(node.value), a[i + 1] as unknown as Heading)
    : ajouteMatter(acc, parse(node.value));
const creeMatiereAvecTitre = (
  acc: StructureMarkdown,
  node: Literal<string>,
  i: number,
  a: readonly Literal<string>[],
) =>
  (i === 0 || isHeading(a[i - 1])) && isHeading(node)
    ? ajouteSection(acc)(fabriqueInformationsTitre(node))
    : acc;
const accumulateurMatiere = (
  acc: StructureMarkdown,
  node: Literal<string>,
  i: number,
  a: readonly Literal<string>[],
) =>
  node.type === "yaml"
    ? ajouteYaml(acc, node, i, a)
    : creeMatiereAvecTitre(acc, node, i, a);
export const extraitMatiere: Plugin<[], Parent<Literal<string>>> =
  () => (tree, file) => {
    file.data.frontmatter = filtreYamlHeading(tree.children).reduce(
      accumulateurMatiere,
      { sections: [] },
    );
  };
