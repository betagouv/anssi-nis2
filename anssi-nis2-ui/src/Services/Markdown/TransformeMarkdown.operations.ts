import { flow } from "fp-ts/lib/function";
import { replace, split, trim } from "fp-ts/lib/string";
import { reduce } from "fp-ts/ReadonlyArray";
import { parse } from "yaml";
import { matchAllWith } from "../../../../commun/utils/services/string.operations.ts";
import { StructureMarkdown } from "./Markdown.declarations.ts";

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

export const extraitFrontMatterBrute = (t: string) =>
  remark().use(remarkFrontmatter).processSync(t);

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
  n.type === "heading";

const extraitMatiere: Plugin<[], Parent<Literal<string>>> =
  () => (tree, file) => {
    const nodes = tree.children.filter((c) =>
      ["yaml", "heading"].includes(c.type),
    );
    file.data.frontmatter = nodes.reduce(
      (acc, node, i, a) => {
        if (node.type === "yaml") {
          const yamlParse = parse(node.value);
          if (a.length > i + 1) {
            const noeudSuivant = a[i + 1];
            if (isHeading(noeudSuivant)) {
              return {
                ...acc,
                sections: [
                  ...acc.sections,
                  {
                    ...yamlParse,
                    ...fabriqueInformationsTitre(noeudSuivant),
                  },
                ],
              };
            }
          }
          return { ...acc, ...yamlParse };
        }
        return acc;
      },
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
