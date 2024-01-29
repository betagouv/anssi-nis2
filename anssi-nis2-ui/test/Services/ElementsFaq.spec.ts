import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { describe, expect, it } from "vitest";
import { construitAncre } from "../../../commun/utils/services/string.operations";
import {
  imbriqueSectionsParNiveau,
  transformeFrontMatterVersSideMenuPropItems,
} from "../../src/Services/ElementsFaq.operations";
import {
  composeMarkdown,
  fmChamps,
  t1,
  t2,
} from "../../src/Services/Markdown/Markdown.constructeurs";
import {
  ExtractionSection,
  InformationsSection,
} from "../../src/Services/Markdown/Markdown.declarations";
import { extraitFrontMatter } from "../../src/Services/Markdown/TransformeMarkdown.operations";
import { loremIpsum } from "./Markdown/constantes";
import { extraitFaqFrontMatter } from "./Markdown/extraitFaq";

const markdownSectionAvec2SousNiveauxNumerotee = (numeroSection: number) => [
  fmChamps([["titreCourt", `${numeroSection}. Titre court`]]),
  t1(`${numeroSection}. Titre long de section`),
  loremIpsum,
  fmChamps([["titreCourt", `${numeroSection}.1 Titre court`]]),
  t2(`${numeroSection}.1 Titre long de section`),
  loremIpsum,
  fmChamps([["titreCourt", `${numeroSection}.2 Titre court`]]),
  t2(`${numeroSection}.2 Titre long de section`),
  loremIpsum,
];
const itemAvecSousSections = (numeroSection: number) => ({
  expandedByDefault: true,
  isActive: true,
  items: [
    {
      expandedByDefault: true,
      isActive: true,
      linkProps: { href: `#${numeroSection}1-titre-court` },
      text: `${numeroSection}.1 Titre court`,
    },
    {
      expandedByDefault: true,
      isActive: true,
      linkProps: { href: `#${numeroSection}2-titre-court` },
      text: `${numeroSection}.2 Titre court`,
    },
  ],
  text: `${numeroSection}. Titre court`,
});
describe("Elements Faq", () => {
  describe("transformeFrontMatterVersSideMenuPropItems", () => {
    it("Renvoie un élément déployé et sélectionné pour un titre frontmatter.", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        fmChamps([["titreCourt", "5. Titre court"]]),
        t1("5. Titre long de section"),
        loremIpsum,
      );
      const frontMatter = extraitFrontMatter(markdown);
      const elements = transformeFrontMatterVersSideMenuPropItems(frontMatter);
      const elementsAttendus: SideMenuProps.Item[] = [
        {
          expandedByDefault: true,
          isActive: true,
          linkProps: { href: "#5-titre-court" },
          text: "5. Titre court",
        },
      ];
      expect(elements).toStrictEqual(elementsAttendus);
    });
    it("Renvoie un élément déployé et sélectionné pour 2 titre frontmatter.", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        fmChamps([["titreCourt", "5. Titre court"]]),
        t1("5. Titre long de section"),
        loremIpsum,
        fmChamps([["titreCourt", "6. Titre court"]]),
        t1("6. Titre long de section"),
        loremIpsum,
      );
      const frontMatter = extraitFrontMatter(markdown);
      const elements = transformeFrontMatterVersSideMenuPropItems(frontMatter);
      const elementsAttendus: SideMenuProps.Item[] = [
        {
          expandedByDefault: true,
          isActive: true,
          linkProps: { href: "#5-titre-court" },
          text: "5. Titre court",
        },
        {
          expandedByDefault: true,
          isActive: true,
          linkProps: { href: "#6-titre-court" },
          text: "6. Titre court",
        },
      ];
      expect(elements).toStrictEqual(elementsAttendus);
    });
    it("Renvoie un élément déployé et sélectionné pour 2 titre frontmatter.", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        fmChamps([["titreCourt", "5. Titre court"]]),
        t1("5. Titre long de section"),
        loremIpsum,
        fmChamps([["titreCourt", "5.1 Titre court"]]),
        t2("5.1 Titre long de section"),
        loremIpsum,
      );
      const frontMatter = extraitFrontMatter(markdown);
      const elements = transformeFrontMatterVersSideMenuPropItems(frontMatter);
      const elementsAttendus: SideMenuProps.Item[] = [
        {
          expandedByDefault: true,
          isActive: true,
          items: [
            {
              expandedByDefault: true,
              isActive: true,
              linkProps: { href: "#51-titre-court" },
              text: "5.1 Titre court",
            },
          ],
          text: "5. Titre court",
        },
      ];
      expect(elements).toStrictEqual(elementsAttendus);
    });
    it("Sections principales avec 2 sous sections", () => {
      const frontMatter = extraitFrontMatter(
        composeMarkdown(
          loremIpsum,
          ...markdownSectionAvec2SousNiveauxNumerotee(5),
        ),
      );
      const elementsAttendus: SideMenuProps.Item[] = [itemAvecSousSections(5)];
      const elements = transformeFrontMatterVersSideMenuPropItems(frontMatter);
      expect(elements).toStrictEqual(elementsAttendus);
    });
    // it("3 sections principales avec 2 sous sections chacune", () => {
    //   const frontMatter = extraitFrontMatter(
    //     composeMarkdown(
    //       loremIpsum,
    //       ...markdownSectionAvec2SousNiveauxNumerotee(5),
    //       ...markdownSectionAvec2SousNiveauxNumerotee(6),
    //       ...markdownSectionAvec2SousNiveauxNumerotee(7),
    //     ),
    //   );
    //   const elements = transformeFrontMatterVersSideMenuPropItems(frontMatter);
    //   const elementsAttendus: SideMenuProps.Item[] = [
    //     itemAvecSousSections(5),
    //     itemAvecSousSections(6),
    //     itemAvecSousSections(7),
    //   ];
    //   expect(elements).toStrictEqual(elementsAttendus);
    // });
  });

  describe("imbriqueSectionsParNiveau", () => {
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
      expect(imbriqueSectionsParNiveau(1)(listeSectionsPlate)).toStrictEqual(
        listeSectionImbriquees,
      );
    });
    it("Ajoute un titre court depuis le titre s'il est inexistant", () => {
      const listeSectionsPlate: readonly ExtractionSection[] = [
        {
          titre: "Titre de section A",
          niveau: 1,
        },
        {
          titre: "Titre de section B",
          niveau: 2,
        },
      ];
      const listeSectionImbriquees = [
        {
          titre: "Titre de section A",
          titreCourt: "Titre de section A",
          niveau: 1,
          sections: [
            {
              titre: "Titre de section B",
              titreCourt: "Titre de section B",
              niveau: 2,
            },
          ],
        },
      ];
      expect(imbriqueSectionsParNiveau(1)(listeSectionsPlate)).toStrictEqual(
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
        imbriqueSectionsParNiveau(1)(extraitFaqFrontMatter.sections),
      ).toStrictEqual(listeSectionImbriquees);
      it("N'imbrique pas des titres de même niveau", () => {
        const listeSectionImbriquees = [
          {
            titre: "Titre de section A",
            titreCourt: "Titre de section A",
            niveau: 1,
          },
          {
            titre: "Titre de section B",
            titreCourt: "Titre de section B",
            niveau: 1,
          },
        ];
        const liste = [
          {
            titre: "Titre de section A",
            niveau: 1,
          },
          {
            titre: "Titre de section B",
            niveau: 1,
          },
        ];
        expect(imbriqueSectionsParNiveau(1)(liste)).toStrictEqual(
          listeSectionImbriquees,
        );
      });
    });
  });

  describe("Transformation des titres", () => {
    it("Transforme un titre simple en ancre", () => {
      const titre = "5. Titre court";
      const ancre = construitAncre(titre);
      expect(ancre).toEqual("#5-titre-court");
    });
    it("Transforme les caractères accentués", () => {
      const titre = "àâä?/xxx"; // éèêë îï";
      const ancre = construitAncre(titre);
      expect(ancre).toEqual("#àâäxxx");
    });
    it("titre buggé", () => {
      const titre =
        "4. Quel est l’objectif derrière la régulation des TPE / PME ?";
      const ancreAttendue =
        "#4-quel-est-lobjectif-derrière-la-régulation-des-tpe--pme-";
      const ancre = construitAncre(titre);
      expect(ancre).toEqual(ancreAttendue);
    });
  });
});
