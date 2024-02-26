import {
  CategorieTaille,
  InformationSecteurPossible,
  ReponseInformationsSecteur,
} from "./Reponse.definitions";
import { fabriqueCategorieTaille } from "./Reponse.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <T extends CategorieTaille>(taille: T) =>
  (
    ensembleSecteurs: Set<InformationSecteurPossible<CategorieTaille>>,
  ): ReponseInformationsSecteur<T> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });
