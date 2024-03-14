import { InformationsSecteurPossible } from "./InformationsSecteur.definitions";
import { ReponseInformationsSecteur } from "./ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "./ReponseStructure.definitions";
import { fabriqueCategorieTaille } from "./ReponseStructure.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <T extends CategorieTaille>(taille: T) =>
  (
    ensembleSecteurs: Set<InformationsSecteurPossible<T>>,
  ): ReponseInformationsSecteur<T> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });