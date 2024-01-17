export const nettoieBrMd = (texte: string) => texte.replace("  \n", " ");
export const separeMarkdownParLignes = (texteMarkdown: string) =>
  `${texteMarkdown}`.split("---");

export const extraitFrontMatterBrute = (texte: string) => {
  const res = texte.match(/---\n([\s\S]*?)\n\s*---/);
  return res ? res[1].trim() : "";
};

const decoupeFrontMatterBrute = (texte: string) =>
  texte
    .split("\n")
    .map((line) => line.split(":"))
    .reduce(
      (acc, couple) => ({ ...acc, [couple[0].trim()]: couple[1].trim() }),
      {},
    );

export const extraitFrontMatter = (texte: string) =>
  texte === "" ? {} : decoupeFrontMatterBrute(extraitFrontMatterBrute(texte));
