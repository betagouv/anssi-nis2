import {
  SecteurActivite,
  SecteurSimple,
} from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { non } from "../../../commun/utils/services/commun.predicats.ts";
import { estUnSecteurAvecDesSousSecteurs } from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";

export const selectSecteursPourSaisieActivites = (
  elements: (SecteurActivite | SousSecteurActivite)[],
): (SecteurSimple | SousSecteurActivite)[] => {
  const sansSousSecteurs = elements.filter(
    non(estUnSecteurAvecDesSousSecteurs),
  );

  return sansSousSecteurs as (SecteurSimple | SousSecteurActivite)[];
};
