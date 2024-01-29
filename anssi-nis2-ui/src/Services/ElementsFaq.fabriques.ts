import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { construitAncre } from "../../../commun/utils/services/string.operations.ts";
import { InformationsSection } from "./Markdown/Markdown.declarations.ts";

export const fabriqueItemSectionFeuille = ({
  titre,
  titreCourt,
}: InformationsSection): SideMenuProps.Item => ({
  linkProps: { href: construitAncre(`${titre}`) },
  text: titreCourt,
});
export const fabriqueItemSectionBranche = (
  { titreCourt }: InformationsSection,
  items: SideMenuProps.Item[],
): SideMenuProps.Item => ({
  items: items,
  text: titreCourt,
});
