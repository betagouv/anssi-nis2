import { fc } from "@fast-check/vitest";
import { estActiviteInfrastructureNumeriqueEligiblesPetitEntite } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";

import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import { fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple } from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArbitraireCapsuleSecteurPetit } from "../../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PE,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PE,
  fabriqueArb_ReponseInformationsSecteur_NonLoca_PE,
  fabriqueArb_EnsInformationsSecteurPossible,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbEnsembleSecteursComposites,
  arbEnsembleSecteurs_AvecBesoinLoca_NonUE,
  arbEnsembleSecteursLocalisablesPetitFrance,
  arbEnsembleSecteursSimples,
} from "./EnsembleInformationsSecteur.arbitraires";
import { arbSecteurActivite_InfrastructureNumerique } from "./InformationsSecteur.arbitraires";

export const arbReponseInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PE(
  arbEnsembleSecteursLocalisablesPetitFrance,
);

export const arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_ReponseInformationsSecteur_NonLoca_PE(
  fabriqueArb_EnsInformationsSecteurPossible(
    arbSecteurActivite_InfrastructureNumerique.chain(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      ),
    ),
  ),
);
export const arbReponseInformationsSecteur_LocalisesHorsUE_Petit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PE(
  arbEnsembleSecteurs_AvecBesoinLoca_NonUE,
);
export const arbReponseInformationsSecteurPetit = fc.oneof(
  fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursComposites),
  fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursSimples),
);
