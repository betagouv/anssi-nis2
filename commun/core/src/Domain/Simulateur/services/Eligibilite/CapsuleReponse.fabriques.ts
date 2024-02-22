import {
  CategorieTaille,
  InformationSecteurPossibleGrand,
  InformationSecteurPossiblePetit,
  ReponseInformationsSecteur,
} from "./Reponse.definitions";
import { fabriqueCategorieTaille } from "./Reponse.fabriques";

export const fabriqueContenuCapsuleInformationSecteur =
  <T extends CategorieTaille>(taille: T) =>
  (
    ensembleSecteurs:
      | Set<InformationSecteurPossiblePetit>
      | Set<InformationSecteurPossibleGrand>,
  ): ReponseInformationsSecteur<T> => ({
    ...fabriqueCategorieTaille(taille),
    secteurs: ensembleSecteurs,
  });
