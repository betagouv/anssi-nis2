import {
  InformationsSecteurPossible,
  ReponseInformationsSecteur,
} from "./ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "./ReponseStructure.definitions";
import { fabriqueCategorieTaille } from "./ReponseStructure.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <T extends CategorieTaille>(taille: T) =>
  (
    ensembleSecteurs: Set<InformationsSecteurPossible<CategorieTaille>>,
  ): ReponseInformationsSecteur<T> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });
