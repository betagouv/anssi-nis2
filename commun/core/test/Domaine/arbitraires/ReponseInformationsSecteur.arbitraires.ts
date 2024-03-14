import { fc } from "@fast-check/vitest";
import { InformationsSecteurPossible } from "../../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";

import { fabriqueArb_ReponseInformationsSecteur_PE } from "../../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille,
  fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbEnsembleSecteurs_AvecBesoinLoca_NonUE,
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursLocalisablesPetitFrance,
  arbEnsembleSecteursSimples,
} from "./EnsembleInformationsSecteur.arbitraires";

export const arbReponseInformationsSecteurLocalisesFrancePetit =
  fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
    "Petit",
  )(arbEnsembleSecteursLocalisablesPetitFrance);

export const arbReponseInformationsSecteur_Infranum_ActiviteConfianceQualifie: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
  "infrastructureNumerique",
)("prestataireServiceConfianceQualifie")("Petit");
export const arbReponseInformationsSecteur_Infranum_ActiviteConfianceNonQualifie: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
  "infrastructureNumerique",
)("prestataireServiceConfianceNonQualifie")("Petit");
export const arbReponseInformationsSecteur_LocalisesHorsUE_Petit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
  "Petit",
)(arbEnsembleSecteurs_AvecBesoinLoca_NonUE);
export const arbReponseInformationsSecteurPetit = fc.oneof(
  fabriqueArb_ReponseInformationsSecteur_PE(
    arbEnsembleSecteursComposites as fc.Arbitrary<
      Set<InformationsSecteurPossible<"Petit">>
    >,
  ),
  fabriqueArb_ReponseInformationsSecteur_PE(arbEnsembleSecteursSimples),
);
