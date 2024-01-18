import { describe, expect, it } from "vitest";
import {
  champ,
  composeMarkdown,
  fmChamps,
  t1,
  t2,
} from "../../../src/Services/Markdown/Markdown.constructeurs";
import { ChampFrontMatter } from "../../../src/Services/Markdown/Markdown.declarations";
import {
  extraitFrontMatter,
  extraitFrontMatterBrute,
  extraitFrontMatterSectionsBrute,
} from "../../../src/Services/Markdown/TransformeMarkdown.operations";
import { loremIpsum } from "./constantes";

const section = (indice: string) =>
  composeMarkdown(
    fmChamps([
      [`champ${indice}1`, `contenu ${indice}1`],
      [`champ${indice}2`, `contenu ${indice}2`],
    ]),
    t2(`Titre de section ${indice}`),
    loremIpsum,
  );
describe("Fonctions support Markdown", () => {
  describe("extraitFrontMatterSectionsBrute", () => {
    it("retourne le contenu simple", () => {
      const markdown = composeMarkdown(
        fmChamps([["champ", "contenu"]]),
        t1("titre"),
      );

      const listeChampsAttendus = [["champ: contenu", "titre"]];
      expect(extraitFrontMatterSectionsBrute(markdown)).toEqual(
        listeChampsAttendus,
      );
    });
    it("retourne le contenu avec 2 sections", () => {
      const markdown = composeMarkdown(loremIpsum, section("A"), section("B"));
      const listeChampsAttendus = [
        ["champA1: contenu A1\nchampA2: contenu A2", "Titre de section A"],
        ["champB1: contenu B1\nchampB2: contenu B2", "Titre de section B"],
      ];
      expect(extraitFrontMatterSectionsBrute(markdown)).toEqual(
        listeChampsAttendus,
      );
    });
    it("retourne le contenu avec 2 sections après un front matter global", () => {
      const markdown = composeMarkdown(
        fmChamps([["titre", "Titre du document"]]),
        loremIpsum,
        section("A"),
        section("B"),
      );
      const listeChampsAttendus = [
        ["champA1: contenu A1\nchampA2: contenu A2", "Titre de section A"],
        ["champB1: contenu B1\nchampB2: contenu B2", "Titre de section B"],
      ];
      expect(extraitFrontMatterSectionsBrute(markdown)).toEqual(
        listeChampsAttendus,
      );
    });
  });

  describe("extraitFrontMatterBrute", () => {
    it("retourne le contenu simple", () => {
      const tupleChamp: ChampFrontMatter = ["champ", "contenu"];
      const champAttendu = champ(tupleChamp);
      expect(extraitFrontMatterBrute(fmChamps([tupleChamp]))).toEqual(
        champAttendu,
      );
    });
    it("retourne le contenu simple, insensible à l'indentation", () => {
      const tupleChamp: ChampFrontMatter = ["    champ", "contenu"];
      const champAttendu = champ(["champ", "contenu"]);
      expect(extraitFrontMatterBrute(fmChamps([tupleChamp]))).toEqual(
        champAttendu,
      );
    });
  });
});

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
            champ: "contenu",
            champ2: "contenu 2",
          },
        ],
      };
      expect(extraitFrontMatter(markdown)).toStrictEqual(objetAttendu);
    });
    it("front matter de 2 titres", () => {
      const markdown = composeMarkdown(loremIpsum, section("A"), section("B"));

      expect(extraitFrontMatter(markdown)).toStrictEqual({
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
    it("front matter du document et de 2 titres", () => {
      const markdown = composeMarkdown(
        fmChamps([["titre", "Titre du document"]]),
        loremIpsum,
        section("A"),
        section("B"),
      );

      expect(extraitFrontMatter(markdown)).toStrictEqual({
        titre: "Titre du document",
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
