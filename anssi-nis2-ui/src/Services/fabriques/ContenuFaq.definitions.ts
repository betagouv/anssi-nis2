import { SideMenuProps } from "@codegouvfr/react-dsfr/SideMenu";
import { FrontMatter } from "../Markdown/Markdown.declarations.ts";

export type ContenuFaq = {
  titre: string;
  contenu: string;
  chapitres: SideMenuProps.Item[];
};

export type FrontMatterFaq = FrontMatter & {
  titre: string;
  titreCourt: string;
  niveau: string;
};
