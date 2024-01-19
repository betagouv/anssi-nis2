import { ContenuFaq } from "./ContenuFaq.definitions.ts";

export const fabriqueContenuFaq = (contenuBrut: string): ContenuFaq => ({
  titre: "FAQ NIS 2",
  contenu: contenuBrut,
  chapitres: [],
});
