import { SecteurSimple } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";

export const fabriqueListeValeursSectorielles = (
  secteursSansSousSecteurs: SecteurSimple[],
  sousSecteurs: SousSecteurActivite[],
) => [...secteursSansSousSecteurs, ...sousSecteurs];
