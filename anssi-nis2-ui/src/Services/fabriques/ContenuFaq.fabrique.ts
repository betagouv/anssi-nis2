import { transformeFrontMatterVersSideMenuPropItems } from "../ElementsFaq.operations.ts";
import { extraitFrontMatter } from "../Markdown/TransformeMarkdown.operations.ts";
import { ContenuFaq } from "./ContenuFaq.definitions.ts";

export const fabriqueContenuFaq = (contenuBrut: string): ContenuFaq => {
  const contenuFrontMatter = extraitFrontMatter(contenuBrut);
  const chapitres =
    transformeFrontMatterVersSideMenuPropItems(contenuFrontMatter);
  return {
    titre: "FAQ NIS 2",
    contenu: contenuBrut,
    chapitres: chapitres,
  };
};
