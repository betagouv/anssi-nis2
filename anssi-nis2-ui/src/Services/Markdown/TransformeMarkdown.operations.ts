import { replace, split } from "fp-ts/lib/string";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { extraitMatiere } from "./ExtraitMatiere.plugin.ts";
import { StructureMarkdown } from "./Markdown.declarations.ts";

export const nettoieBrMd = replace("  \n", " ");
export const separeMarkdownParLignes = split("---");

export const extraitFrontMatter = (texte: string): StructureMarkdown =>
  remark()
    .use(remarkFrontmatter, { marker: "-", type: "yaml", anywhere: true })
    .use(extraitMatiere)
    .processSync(texte).data.frontmatter as StructureMarkdown;
