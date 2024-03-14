import { fc } from "@fast-check/vitest";
import {
  InformationsSecteurPossible,
  RepInfoSecteur,
} from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";

import { fabriqueArb_ReponseInformationsSecteur_PE } from "../../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursSimples,
} from "./EnsembleInformationsSecteur.arbitraires";

// export const arbReponseInformationsSecteurLocalisesFrancePetit =
//   fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
//     "Petit",
//   )(arbEnsembleSecteursLocalisablesPetitFrance);
// export const arbReponseInformationsSecteur_LocalisesHorsUE_Petit: fc.Arbitrary<
//   ReponseInformationsSecteur<"Petit">
// > = fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
//   "Petit",
// )(arbEnsembleSecteurs_AvecBesoinLoca_NonUE);
export const arbReponseInformationsSecteurPetit = fc.oneof(
  fabriqueArb_ReponseInformationsSecteur_PE(
    arbEnsembleSecteursComposites as fc.Arbitrary<
      Set<InformationsSecteurPossible<"Petit">>
    >,
  ),
  fabriqueArb_ReponseInformationsSecteur_PE(
    arbEnsembleSecteursSimples as fc.Arbitrary<Set<RepInfoSecteur<"Petit">>>,
  ),
);
