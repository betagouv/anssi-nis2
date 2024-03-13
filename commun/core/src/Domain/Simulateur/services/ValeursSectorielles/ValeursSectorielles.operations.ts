import { SecteurSimple } from "../../SecteurActivite.definitions";
import { SousSecteurListes } from "../../SousSecteurActivite.definitions";

export const fabriqueListeValeursSectorielles = (
  secteursSansSousSecteurs: SecteurSimple[],
  sousSecteurs: SousSecteurListes[],
) => [...secteursSansSousSecteurs, ...sousSecteurs];
