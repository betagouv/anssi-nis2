import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";

export const fabriqueListeValeursSectorielles = (
  secteursSansSousSecteurs: SecteursSansSousSecteur[],
  sousSecteurs: SousSecteurActivite[]
) => [...secteursSansSousSecteurs, ...sousSecteurs];
