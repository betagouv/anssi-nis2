import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { describe, expect, it } from "vitest";
import { transformeFrontMatterVersSideMenuPropItems } from "../../src/Services/ElementsFaq.operations";
import {
  composeMarkdown,
  fmChamps,
  t1,
  t2,
} from "../../src/Services/Markdown/Markdown.constructeurs";
import { extraitFrontMatter } from "../../src/Services/Markdown/TransformeMarkdown.operations";
import { loremIpsum } from "./Markdown/constantes";

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
  items: [
    {
      linkProps: { href: `#${numeroSection}1-titre-long-de-section` },
      text: `${numeroSection}.1 Titre court`,
    },
    {
      linkProps: { href: `#${numeroSection}2-titre-long-de-section` },
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
          linkProps: { href: "#5-titre-long-de-section" },
          text: "5. Titre court",
        },
      ];
      expect(elements).toStrictEqual(elementsAttendus);
    });
    it("Renvoie 2 éléments déployés et sélectionné pour 2 titre frontmatter.", () => {
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
          linkProps: { href: "#5-titre-long-de-section" },
          text: "5. Titre court",
        },
        {
          linkProps: { href: "#6-titre-long-de-section" },
          text: "6. Titre court",
        },
      ];
      expect(elements).toStrictEqual(elementsAttendus);
    });
    it("Renvoie un élément déployé et sélectionné pour 1 titre imbriqué dans un autre", () => {
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
          items: [
            {
              linkProps: { href: "#51-titre-long-de-section" },
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
    it("3 sections principales avec 2 sous sections chacune", () => {
      const frontMatter = extraitFrontMatter(
        composeMarkdown(
          loremIpsum,
          ...markdownSectionAvec2SousNiveauxNumerotee(5),
          ...markdownSectionAvec2SousNiveauxNumerotee(6),
          ...markdownSectionAvec2SousNiveauxNumerotee(7),
        ),
      );
      const elements = transformeFrontMatterVersSideMenuPropItems(frontMatter);
      const elementsAttendus: SideMenuProps.Item[] = [
        itemAvecSousSections(5),
        itemAvecSousSections(6),
        itemAvecSousSections(7),
      ];
      expect(elements).toStrictEqual(elementsAttendus);
    });
  });
});
