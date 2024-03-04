import { fc } from "@fast-check/vitest";
import { estActiviteInfrastructureNumeriqueEligiblesPetitEntite } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  fabriqueArbitraireCapsuleSecteurGrand,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_AvecEnsembleDe,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe,
  fabriqueArbitraireCapsuleSecteurLocalisablePetit_Oui_France,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFranceGrand,
  fabriqueArbitraireCapsuleSecteurNonLoca,
  fabriqueArbitraireCapsuleSecteurPetit,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursCompositesActivitesAutres,
  arbEnsembleSecteursLocalisablesNonFrance,
  arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
  arbEnsembleSecteursLocalisablesPetitFrance,
  arbEnsembleSecteursSimples,
  arbEnsembleSecteursSimplesActivitesAutres,
  arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
} from "./EnsembleInformationsSecteur.arbitraires";
import {
  arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI,
  arbInformationsSecteurLocaliseesFranceGrandeEI,
  arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
  arbInformationsSecteurLocaliseesFranceGrandeInfranumEI,
  arbSecteurInfrascructureNumerique,
} from "./InformationsSecteur.arbitraires";

export const arbReponseInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisablePetit_Oui_France(
  arbEnsembleSecteursLocalisablesPetitFrance,
);

export const arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurNonLoca(
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbSecteurInfrascructureNumerique.chain(
      fabriqueArbitraireEnsembleActivitesPourSecteur(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      ),
    ),
  ),
);
export const arbReponseInformationsSecteurLocalisesFranceGrandInfranumEE =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe(
    arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
  );

export const arbReponseInformationsSecteurFranceGrandInfranumEI =
  fabriqueArbitraireCapsuleSecteurGrand(
    arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI,
  );

export const arbReponseInformationsSecteurLocalisesFranceGrandInfranumEI =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_AvecEnsembleDe(
    arbInformationsSecteurLocaliseesFranceGrandeInfranumEI,
  );
export const arbReponseInformationsSecteur_LocalisesFrance_Grand_EI =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe(
    arbInformationsSecteurLocaliseesFranceGrandeEI,
  );

/**
 * Secteurs
 * - "Gestion des services TIC
 * - "Fournisseurs numériques"
 * Pas de restriction sur les activités
 */
export const arbReponseInformationsSecteur_AvecBesoinLoca_GrandEI_LocalisationHorsFrance =
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFranceGrand(
    arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
  );
export const arbReponseInformationsSecteurLocalisesHorsFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance(
  arbEnsembleSecteursLocalisablesNonFrance,
);
export const arbReponseInformationsSecteurPetit = fc.oneof(
  fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursComposites),
  fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursSimples),
);
export const arbReponseInformationsSecteurGrand = fc.oneof(
  fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursComposites),
  fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursSimples),
);
export const arbReponseInformationsSecteurGrandActivitesAutres = fc.oneof(
  fabriqueArbitraireCapsuleSecteurGrand(
    arbEnsembleSecteursCompositesActivitesAutres,
  ),
  fabriqueArbitraireCapsuleSecteurGrand(
    arbEnsembleSecteursSimplesActivitesAutres,
  ),
  fabriqueArbitraireCapsuleSecteurGrand(
    arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
  ),
);
