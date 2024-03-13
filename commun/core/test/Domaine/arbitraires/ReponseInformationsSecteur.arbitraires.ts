import { fc } from "@fast-check/vitest";
import { flow } from "fp-ts/lib/function";
import { SecteurActivite } from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { estActiviteInfrastructureNumeriqueEligiblesPetitEntite } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationsSecteurPossible,
  InformationsSecteurSimpleListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { transformeSecteurSimple_SecteurPeutEtreComposite } from "../../../src/Domain/Simulateur/SousSecteurActivite.operations";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";

import { fabriqueArb_EnsActivites_AvecFiltre_PourSecteur } from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArb_ReponseInformationsSecteur_PE } from "../../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_EnsInformationsSecteurPossible,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille,
  fabriqueArb_ReponseInformationsSecteur_NonLoca_PE,
  fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbEnsembleSecteurs_AvecBesoinLoca_NonUE,
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursLocalisablesPetitFrance,
  arbEnsembleSecteursSimples,
} from "./EnsembleInformationsSecteur.arbitraires";
import { arbSecteurActivite_InfrastructureNumerique } from "./SecteurActivite.arbitraires";

export const arbReponseInformationsSecteurLocalisesFrancePetit =
  fabriqueArb_ReponseInformationsSecteur_SecteurLocalisable_Oui_France_PourTaille(
    "Petit",
  )(arbEnsembleSecteursLocalisablesPetitFrance);

export const arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArb_ReponseInformationsSecteur_NonLoca_PE(
  fabriqueArb_EnsInformationsSecteurPossible(
    A.enchaine(
      flow(
        transformeSecteurSimple_SecteurPeutEtreComposite,
        fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(
          estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
        ),
      ) as (
        secteur: SecteurActivite,
      ) => fc.Arbitrary<InformationsSecteurSimpleListe>,
    )(arbSecteurActivite_InfrastructureNumerique),
  ),
);
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
