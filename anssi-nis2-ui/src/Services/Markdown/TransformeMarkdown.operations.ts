import { flow } from "fp-ts/lib/function";
import { replace, split, trim } from "fp-ts/lib/string";
import { reduce } from "fp-ts/ReadonlyArray";
import { parse } from "yaml";
import { VVV } from "../../../../commun/core/src/Domain/utilitaires/debug.ts";
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
import { Parent } from "unist";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";

export const extraitFrontMatterBrute = (t: string) =>
  remark().use(remarkFrontmatter).processSync(t);

export const extraitFrontMatterSectionsBrute = flow(
  matchAllWith(regexFrontMatterSections),
  reduitTuplesChamps,
);

const fabriqueInformationsTitre = (noeud: Parent) => {
  return {
    titre: noeud.children[0].value,
    niveau: noeud.depth,
  };
};

const extraitMatiere: Plugin<[], Parent> = () => (tree, file) => {
  const nodes = tree.children.filter((c) =>
    ["yaml", "heading"].includes(c.type),
  ) as Parent[];
  file.data.frontmatter = nodes.reduce(
    (acc, node, i, a) => {
      if (node.type === "yaml") {
        const yamlParse = parse(node.value);
        if (a.length > i + 1 && a[i + 1].type === "heading") {
          VVV("Title related frontmatter", yamlParse);
          VVV("\tTitle :", a[i + 1].children);

          return {
            ...acc,
            sections: [
              ...acc.sections,
              {
                ...yamlParse,
                ...fabriqueInformationsTitre(a[i + 1]),
              },
            ],
          };
        }
        VVV("Top level frontmatter : ", yamlParse);
        VVV("\tobjet retourné : ", { ...acc, ...yamlParse });
        return { ...acc, ...yamlParse };
      }
      VVV("inside heading", node.children[0].value);
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
  return mdast.data.frontmatter;
};
