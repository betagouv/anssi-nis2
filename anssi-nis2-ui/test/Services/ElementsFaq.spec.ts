import { describe, expect, it } from "vitest";
import { construitAncre } from "../../../commun/utils/services/string.operations";
import { transformeFrontMatterVersSideMenuPropItems } from "../../src/Services/ElementsFaq.operations";
import {
  composeMarkdown,
  fmChamps,
  t2,
} from "../../src/Services/Markdown/Markdown.constructeurs";
import { extraitFrontMatter } from "../../src/Services/Markdown/TransformeMarkdown.operations";
import { loremIpsum } from "./Markdown/constantes";
import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";

describe("Elements Faq", () => {
  describe(transformeFrontMatterVersSideMenuPropItems, () => {
    it("Renvoie un élément déployé et sélectionné pour un titre frontmatter.", () => {
      const markdown = composeMarkdown(
        loremIpsum,
        fmChamps([["titreCourt", "5. Titre court"]]),
        t2("5. Titre long de section"),
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
  });

  describe("Transformation des titres", () => {
    it("Transforme un titre simple en ancre", () => {
      const titre = "5. Titre court";
      const ancre = construitAncre(titre);
      expect(ancre).toEqual("#5-titre-court");
    });
  });
});
