import {
  CategorieTaille,
  InformationsSecteurPossible,
  ReponseInformationsSecteur,
} from "./Reponse.definitions";
import { fabriqueCategorieTaille } from "./Reponse.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <T extends CategorieTaille>(taille: T) =>
  (
    ensembleSecteurs: Set<InformationsSecteurPossible<CategorieTaille>>,
  ): ReponseInformationsSecteur<T> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });
