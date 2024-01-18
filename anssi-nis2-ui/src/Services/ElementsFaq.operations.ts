import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { construitAncre } from "../../../commun/utils/services/string.operations.ts";
import { StructureMarkdown } from "./Markdown/Markdown.declarations.ts";

export const transformeFrontMatterVersSideMenuPropItems = (
  structure: StructureMarkdown,
): SideMenuProps.Item[] =>
  structure.sections.map(({ titreCourt }) => ({
    expandedByDefault: true,
    isActive: true,
    linkProps: { href: construitAncre(titreCourt) },
    text: titreCourt,
  }));
