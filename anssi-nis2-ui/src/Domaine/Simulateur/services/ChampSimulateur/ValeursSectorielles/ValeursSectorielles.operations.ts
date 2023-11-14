import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "../../../SousSecteurActivite.definitions.ts";

export const fabriqueListeValeursSectorielles = (
  secteursSansSousSecteurs: SecteursSansSousSecteur[],
  sousSecteurs: SousSecteurActivite[],
) => [...secteursSansSousSecteurs, ...sousSecteurs];
