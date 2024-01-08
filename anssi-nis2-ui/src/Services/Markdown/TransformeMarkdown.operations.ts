export const nettoieBrMd = (texte: string) => texte.replace("  \n", " ");
export const separeMarkdownParLignes = (texteMarkdown: string) =>
  `${texteMarkdown}`.split("----");
