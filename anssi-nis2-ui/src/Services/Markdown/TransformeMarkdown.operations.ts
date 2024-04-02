import { replace, split } from "fp-ts/lib/string";

export const nettoieBrMd = replace("  \n", " ");
export const separeMarkdownParLignes = split("---");
