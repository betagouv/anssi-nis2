import {
  CategorieTaille,
  InformationsSecteurPossible,
  ReponseInformationsSecteur,
} from "./StructuresReponse.definitions";
import { fabriqueCategorieTaille } from "./StructuresReponse.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <T extends CategorieTaille>(taille: T) =>
  (
    ensembleSecteurs: Set<InformationsSecteurPossible<CategorieTaille>>,
  ): ReponseInformationsSecteur<T> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });
