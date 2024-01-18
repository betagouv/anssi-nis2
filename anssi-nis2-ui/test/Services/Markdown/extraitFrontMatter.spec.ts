import { describe, expect, it } from "vitest";
import {
  extraitFrontMatter,
  extraitFrontMatterBrute,
  extraitFrontMatterSectionsBrute,
} from "../../../src/Services/Markdown/TransformeMarkdown.operations";

type ChampFrontMatter = [string, string];
const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit
  sed do eiusmod tempor incididunt ut labore`;
const champ = ([nom, contenu]: ChampFrontMatter) => `${nom}: ${contenu}`;
const frontMatter = (champBrut: string) => `
  ---
  ${champBrut}
  ---
  `;
const champs = (listeChamps: ChampFrontMatter[]) =>
  listeChamps.map(champ).join("\n");

const exempleFrontMatterDeuxChamps = frontMatter(
  champs([
    ["champ", "contenu"],
    ["champ2", "contenu 2"],
  ]),
);
const exempleFrontMatterAvecUnTitre = `
  ${frontMatter(champs([["champ", "contenu"]]))}
  # titre
  `;
const exMarkdownDeuxChapitresAvecFrontMatter = `
  ${loremIpsum}
  
  ${frontMatter(
    champs([
      ["champA1", "contenu A1"],
      ["champA2", "contenu A2"],
    ]),
  )}
  ## Titre de section A
  
  ${loremIpsum}
  
  ${frontMatter(
    champs([
      ["champB1", "contenu B1"],
      ["champB2", "contenu B2"],
    ]),
  )}
  ## Titre de section B
  
  ${loremIpsum}
  `;
const exMarkdownUnChapitreAvecFrontMatter = `
  ${loremIpsum}
  ${frontMatter(
    champs([
      ["champ", "contenu"],
      ["champ2", "contenu 2"],
    ]),
  )}
  ## Titre de section
  
  ${loremIpsum}`;
describe(extraitFrontMatterSectionsBrute, () => {
  it("retourne le contenu simple", () => {
    expect(
      extraitFrontMatterSectionsBrute(exempleFrontMatterAvecUnTitre),
    ).toEqual([["champ: contenu", "titre"]]);
  });
  it("retourne le contenu simple", () => {
    expect(
      extraitFrontMatterSectionsBrute(exMarkdownDeuxChapitresAvecFrontMatter),
    ).toEqual([
      ["champA1: contenu A1\nchampA2: contenu A2", "Titre de section A"],
      ["champB1: contenu B1\nchampB2: contenu B2", "Titre de section B"],
    ]);
  });
});

describe(extraitFrontMatterBrute, () => {
  it("retourne le contenu simple", () => {
    expect(
      extraitFrontMatterBrute(frontMatter(champs([["champ", "contenu"]]))),
    ).toEqual("champ: contenu");
  });
  it("retourne le contenu simple, insensible à l'indentation", () => {
    expect(
      extraitFrontMatterBrute(frontMatter(champs([["champ", "contenu"]]))),
    ).toEqual("champ: contenu");
  });
});

describe(extraitFrontMatter, () => {
  describe("seul dans le document", () => {
    it("n'extrait rien pour un Front Matter vide", () => {
      expect(extraitFrontMatter("")).toStrictEqual({});
    });
    it("extrait pour un champ simple", () => {
      expect(
        extraitFrontMatter(frontMatter(champs([["champ", "contenu"]]))),
      ).toStrictEqual({
        champ: "contenu",
      });
    });
    it("extrait pour un champ simple", () => {
      expect(extraitFrontMatter(exempleFrontMatterDeuxChamps)).toStrictEqual({
        champ: "contenu",
        champ2: "contenu 2",
      });
    });
  });
  describe("Au milieu d'un document, inclue le titre qui suit", () => {
    it("front matter d'un titre", () => {
      expect(
        extraitFrontMatter(exMarkdownUnChapitreAvecFrontMatter),
      ).toStrictEqual({
        sections: [
          {
            titre: "Titre de section",
            champ: "contenu",
            champ2: "contenu 2",
          },
        ],
      });
    });
    it("front matter de 2 titres", () => {
      expect(
        extraitFrontMatter(exMarkdownDeuxChapitresAvecFrontMatter),
      ).toStrictEqual({
        sections: [
          {
            titre: "Titre de section A",
            champA1: "contenu A1",
            champA2: "contenu A2",
          },
          {
            titre: "Titre de section B",
            champB1: "contenu B1",
            champB2: "contenu B2",
          },
        ],
      });
    });
  });
});
