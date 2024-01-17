export const nettoieBrMd = (texte: string) => texte.replace("  \n", " ");
export const separeMarkdownParLignes = (texteMarkdown: string) =>
  `${texteMarkdown}`.split("---");

const regexFrontMatterBase = /^\s*---\n([\s\S]*?)\n\s*---/;
const regexFrontMatterSections = /---\n([\s\S]*?)\n\s*---\n\s*[#]+([^\n]+)\n/g;
export const extraitFrontMatterBrute = (texte: string) => {
  const res = texte.match(regexFrontMatterBase);
  return res ? res[1].trim() : "";
};
export const extraitFrontMatterSectionsBrute = (texte: string) =>
  Array.from(texte.matchAll(regexFrontMatterSections)).reduce(
    (acc: string[][], m) => [...acc, [m[1].trim(), m[2].trim()]],
    [],
  );

const decoupeFrontMatterBrute = (texte: string) =>
  texte === ""
    ? {}
    : texte
        .split("\n")
        .map((line) => line.split(":"))
        .reduce(
          (acc, couple) => ({ ...acc, [couple[0].trim()]: couple[1].trim() }),
          {},
        );

const extraitSections = (texte: string) =>
  extraitFrontMatterSectionsBrute(texte).length === 0
    ? {}
    : {
        sections: extraitFrontMatterSectionsBrute(texte).reduce(
          (acc: unknown[], elt) => [
            ...acc,
            {
              titre: elt[1],
              ...decoupeFrontMatterBrute(elt[0]),
            },
          ],
          [],
        ),
      };

export const extraitFrontMatter = (texte: string) => ({
  ...decoupeFrontMatterBrute(extraitFrontMatterBrute(texte)),
  ...extraitSections(texte),
});
