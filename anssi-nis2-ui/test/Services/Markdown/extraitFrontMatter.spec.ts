import { describe, expect, it } from "vitest";
import {
  composeMarkdown,
  fmChamps,
  t1,
  t2,
  titre,
} from "../../../src/Services/Markdown/Markdown.constructeurs";
import { NiveauTitre } from "../../../src/Services/Markdown/Markdown.declarations";
import { extraitFrontMatter } from "../../../src/Services/Markdown/TransformeMarkdown.operations";
import { loremIpsum } from "./constantes";
import { extraitFaq, extraitFaqFrontMatter } from "./extraitFaq";

const section = (niveau: NiveauTitre) => (indice: string) =>
  composeMarkdown(
    fmChamps([
      [`champ${indice}1`, `contenu ${indice}1`],
      [`champ${indice}2`, `contenu ${indice}2`],
    ]),
    titre(niveau)(`Titre de section ${indice}`),
    loremIpsum,
  );

const sectionN1 = section(1);

describe(extraitFrontMatter, () => {
  describe("seul dans le document", () => {
    it("n'extrait rien pour un Front Matter vide", () => {
      expect(extraitFrontMatter("")).toStrictEqual({ sections: [] });
    });
    it("extrait pour un champ simple", () => {
      expect(
        extraitFrontMatter(fmChamps([["champ", "contenu"]])),
      ).toStrictEqual({
        champ: "contenu",
        sections: [],
      });
    });
    it("extrait pour un champ simple", () => {
      const markdown = fmChamps([
        ["champ", "contenu"],
        ["champ2", "contenu 2"],
      ]);
      const frontMatter = extraitFrontMatter(markdown);
      const objetAttendu = {
        champ: "contenu",
        champ2: "contenu 2",
        sections: [],
      };
      expect(frontMatter).toStrictEqual(objetAttendu);
    });
  });

  describe("Au milieu d'un document, inclue le titre qui suit", () => {
    it("front matter d'un titre", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        fmChamps([
          ["champ", "contenu"],
          ["champ2", "contenu 2"],
        ]),
        t2("Titre de section"),
        loremIpsum,
      );
      const objetAttendu = {
        sections: [
          {
            titre: "Titre de section",
            niveau: 2,
            champ: "contenu",
            champ2: "contenu 2",
          },
        ],
      };
      expect(extraitFrontMatter(markdown)).toStrictEqual(objetAttendu);
    });
    it("front matter de 2 titres", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        sectionN1("A"),
        sectionN1("B"),
      );

      expect(extraitFrontMatter(markdown)).toStrictEqual({
        sections: [
          {
            titre: "Titre de section A",
            niveau: 1,
            champA1: "contenu A1",
            champA2: "contenu A2",
          },
          {
            titre: "Titre de section B",
            niveau: 1,
            champB1: "contenu B1",
            champB2: "contenu B2",
          },
        ],
      });
    });
    it("front matter du document et de 2 titres", () => {
      const markdown = composeMarkdown(
        fmChamps([["titre", "Titre du document"]]),
        loremIpsum,
        sectionN1("A"),
        sectionN1("B"),
      );

      expect(extraitFrontMatter(markdown)).toStrictEqual({
        titre: "Titre du document",
        sections: [
          {
            titre: "Titre de section A",
            niveau: 1,
            champA1: "contenu A1",
            champA2: "contenu A2",
          },
          {
            titre: "Titre de section B",
            niveau: 1,
            champB1: "contenu B1",
            champB2: "contenu B2",
          },
        ],
      });
    });
    it("si la front matter est absente des titres, elle est créée à partir de celui-ci", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        t1("Titre de section A"),
        loremIpsum,
        t1("Titre de section B"),
        loremIpsum,
      );

      expect(extraitFrontMatter(markdown)).toStrictEqual({
        sections: [
          {
            titre: "Titre de section A",
            niveau: 1,
          },
          {
            titre: "Titre de section B",
            niveau: 1,
          },
        ],
      });
    });
    it("front matter du document et de 2 titres imbriqués", () => {
      const markdown = composeMarkdown(
        fmChamps([["titre", "Titre du document"]]),
        loremIpsum,
        sectionN1("A"),
        section(2)("B"),
      );

      expect(extraitFrontMatter(markdown)).toStrictEqual({
        titre: "Titre du document",
        sections: [
          {
            titre: "Titre de section A",
            niveau: 1,
            champA1: "contenu A1",
            champA2: "contenu A2",
          },
          {
            titre: "Titre de section B",
            niveau: 2,
            champB1: "contenu B1",
            champB2: "contenu B2",
          },
        ],
      });
    });
    it("front matter du document extrait Faq", () => {
      expect(extraitFrontMatter(extraitFaq)).toStrictEqual(
        extraitFaqFrontMatter,
      );
    });
  });
});
