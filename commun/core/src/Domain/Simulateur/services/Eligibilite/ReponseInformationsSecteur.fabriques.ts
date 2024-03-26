import {
  RepInfoSecteur,
  ReponseInformationsSecteur,
} from "./ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "./ReponseStructure.definitions";
import { fabriqueCategorieTaille } from "./ReponseStructure.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <Taille extends CategorieTaille>(taille: `${Taille}`) =>
  (
    ensembleSecteurs: Set<RepInfoSecteur<Taille>>,
  ): ReponseInformationsSecteur<Taille> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });
