import { includes, replace, split } from "fp-ts/lib/string";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { extraitMatiere } from "./ExtraitMatiere.plugin.ts";
import { StructureMarkdown } from "./Markdown.declarations.ts";
import { flow } from "fp-ts/lib/function";

const replaceAll: (
  searchValue: string,
  replaceValue: string,
) => (s: string) => string =
  (searchValue: string, replaceValue: string) => (s: string) =>
    includes(searchValue)(s)
      ? replaceAll(
          searchValue,
          replaceValue,
        )(replace(searchValue, replaceValue)(s))
      : s;

export const nettoieBrMd = replace("  \n", " ");
export const nettoieMd = flow(
  nettoieBrMd,
  replaceAll("**_", ""),
  replaceAll("_**", ""),
);
export const separeMarkdownParLignes = split("---");

export const extraitFrontMatter = (texte: string): StructureMarkdown =>
  remark()
    .use(remarkFrontmatter, { marker: "-", type: "yaml", anywhere: true })
    .use(extraitMatiere)
    .processSync(texte).data.frontmatter as StructureMarkdown;
