import { describe, expect, it } from "vitest";
import { imbriqueSectionsParNiveau } from "../../../src/Services/ElementsFaq.operations";
import {
  composeMarkdown,
  fmChamps,
  t2,
  titre,
} from "../../../src/Services/Markdown/Markdown.constructeurs";
import {
  InformationsSection,
  NiveauTitre,
} from "../../../src/Services/Markdown/Markdown.declarations";
import {
  extraitFrontMatter,
  extraitFrontMatterSectionsBrute,
} from "../../../src/Services/Markdown/TransformeMarkdown.operations";
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
describe("Fonctions support Markdown", () => {
  describe("extraitFrontMatterSectionsBrute", () => {
    it("retourne le contenu simple", () => {
      const markdown = composeMarkdown(
        fmChamps([["champ", "contenu"]]),
        t2("titre"),
      );

      const listeChampsAttendus = [["champ: contenu", "##", "titre"]];
      expect(extraitFrontMatterSectionsBrute(markdown)).toEqual(
        listeChampsAttendus,
      );
    });
    it("retourne le contenu avec 2 sections", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        sectionN1("A"),
        sectionN1("B"),
      );
      const listeChampsAttendus = [
        ["champA1: contenu A1\nchampA2: contenu A2", "#", "Titre de section A"],
        ["champB1: contenu B1\nchampB2: contenu B2", "#", "Titre de section B"],
      ];
      expect(extraitFrontMatterSectionsBrute(markdown)).toEqual(
        listeChampsAttendus,
      );
    });
    it("retourne le contenu avec 2 sections après un front matter global", () => {
      const markdown = composeMarkdown(
        fmChamps([["titre", "Titre du document"]]),
        loremIpsum,
        sectionN1("A"),
        sectionN1("B"),
      );
      const listeChampsAttendus = [
        ["champA1: contenu A1\nchampA2: contenu A2", "#", "Titre de section A"],
        ["champB1: contenu B1\nchampB2: contenu B2", "#", "Titre de section B"],
      ];
      expect(extraitFrontMatterSectionsBrute(markdown)).toEqual(
        listeChampsAttendus,
      );
    });
    it("retourne le contenu avec 2 sections après un front matter global", () => {
      const listeChampsAttendus = [
        ["titreCourt: Introduction", "#", "Introduction"],
        [
          "titreCourt: En quoi consistait la directive NIS 1&nbsp;?",
          "##",
          "1. En 2016, le Parlement et le Conseil de l’UE ont adopté une première série de mesures concernant la cybersécurité du marché européen. En quoi consistait exactement cette directive connue sous le nom de NIS 1&nbsp;?",
        ],
      ];
      expect(extraitFrontMatterSectionsBrute(extraitFaq)).toEqual(
        listeChampsAttendus,
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

describe(imbriqueSectionsParNiveau, () => {
  it("Imbrique un niveau 1 dans un niveau 2", () => {
    const listeSectionsPlate: readonly InformationsSection[] = [
      {
        titre: "Titre de section A",
        titreCourt: "Titre court A",
        niveau: 1,
      },
      {
        titre: "Titre de section B",
        titreCourt: "Titre court B",
        niveau: 2,
      },
    ];
    const listeSectionImbriquees = [
      {
        titre: "Titre de section A",
        titreCourt: "Titre court A",
        niveau: 1,
        sections: [
          {
            titre: "Titre de section B",
            titreCourt: "Titre court B",
            niveau: 2,
          },
        ],
      },
    ];
    expect(imbriqueSectionsParNiveau(listeSectionsPlate)).toStrictEqual(
      listeSectionImbriquees,
    );
  });
  it("Imbrique les section de la Faq", () => {
    const listeSectionImbriquees = [
      {
        titre: "Introduction",
        niveau: 1,
        titreCourt: "Introduction",
        sections: [
          {
            titre:
              "1. En 2016, le Parlement et le Conseil de l’UE ont adopté une première série de mesures concernant la cybersécurité du marché européen. En quoi consistait exactement cette directive connue sous le nom de NIS 1 ?",
            niveau: 2,
            titreCourt: "En quoi consistait la directive NIS 1&nbsp;?",
          },
        ],
      },
    ];
    expect(
      imbriqueSectionsParNiveau(extraitFaqFrontMatter.sections),
    ).toStrictEqual(listeSectionImbriquees);
  });
});
