import { SecteurSimple } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { non } from "../../../commun/utils/services/commun.predicats.ts";
import { estUnSecteurAvecDesSousSecteurs } from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { EtatQuestionnaire } from "./reducerQuestionnaire.ts";

export const selectSecteursPourSaisieActivites = (
  etat: EtatQuestionnaire,
): (SecteurSimple | SousSecteurActivite)[] => {
  const elements = [...etat.secteurActivite, ...etat.sousSecteurActivite];
  const sansSousSecteurs = elements.filter(
    non(estUnSecteurAvecDesSousSecteurs),
  );

  return sansSousSecteurs as (SecteurSimple | SousSecteurActivite)[];
};
