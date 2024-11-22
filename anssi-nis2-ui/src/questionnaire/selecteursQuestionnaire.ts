import { SecteurSimple } from "../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "../../../commun/core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { estSousSecteurListe } from "../../../commun/core/src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats.ts";
import { non } from "../../../commun/utils/services/commun.predicats.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { EtatQuestionnaire } from "../../../commun/core/src/Domain/Questionnaire/EtatQuestionnaire";

export const selectSecteursPourSaisieActivites = (
  etat: EtatQuestionnaire,
): (SecteurSimple | SousSecteurActivite)[] => {
  const elements = [...etat.secteurActivite, ...etat.sousSecteurActivite];
  const sansSousSecteurs = elements
    .filter(non(estUnSecteurAvecDesSousSecteurs))
    .filter(estSousSecteurListe);

  return sansSousSecteurs as (SecteurSimple | SousSecteurActivite)[];
};
