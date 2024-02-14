import { SecteursSansSousSecteur } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";

export const fabriqueListeValeursSectorielles = (
  secteursSansSousSecteurs: SecteursSansSousSecteur[],
  sousSecteurs: SousSecteurActivite[],
) => [...secteursSansSousSecteurs, ...sousSecteurs];
