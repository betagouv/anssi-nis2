import { FrontMatter } from "../Markdown/Markdown.declarations.ts";

export type ContenuFaq = {
  titre: string;
  contenu: string;
  chapitres: {
    ancre: string;
    titreCourt: string;
  }[];
};

export type FrontMatterFaq = FrontMatter & {
  titre: string;
  titreCourt: string;
  niveau: string;
};
