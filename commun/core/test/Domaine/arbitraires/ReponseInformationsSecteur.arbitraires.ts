import { fc } from "@fast-check/vitest";
import { ValeursActivitesInfrastructureNumeriqueEligiblesPetitEntite } from "../../../src/Domain/Simulateur/Activite.valeurs";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursCompositesActivitesAutres,
  arbEnsembleSecteursLocalisablesNonFrance,
  arbEnsembleSecteursLocalisablesNonFranceGrande,
  arbEnsembleSecteursLocalisablesPetitFrance,
  arbEnsembleSecteursSimples,
  arbEnsembleSecteursSimplesActivitesAutres,
  arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
} from "./EnsembleInformationsSecteur.arbitraires";
import {
  arbInformationsSecteurLocaliseesFranceGrandeEI,
  arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
  arbInformationsSecteurLocaliseesFranceGrandeInfranumEI,
  arbSecteurInfrascructureNumerique,
} from "./InformationsSecteur.arbitraires";
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
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";

export const arbReponseInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisablePetit_Oui_France(
  arbEnsembleSecteursLocalisablesPetitFrance,
);

const chainer_Ensemble_ActivitesInfraNum_Secteur =
  fabriqueArbitraireEnsembleActivitesPourSecteur((a) =>
    ValeursActivitesInfrastructureNumeriqueEligiblesPetitEntite.includes(a),
  );
export const arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurNonLoca(
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbSecteurInfrascructureNumerique.chain(
      chainer_Ensemble_ActivitesInfraNum_Secteur,
    ),
  ),
);
export const arbReponseInformationsSecteurLocalisesFranceGrandInfranumEE =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe(
    arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
  );
export const arbReponseInformationsSecteurLocalisesFranceGrandInfranumEI =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_AvecEnsembleDe(
    arbInformationsSecteurLocaliseesFranceGrandeInfranumEI,
  );
export const arbReponseInformationsSecteurLocalisesFranceGrandEI =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe(
    arbInformationsSecteurLocaliseesFranceGrandeEI,
  );

export const arbReponseInformationsSecteurFranceGrandEILocalisationHorsFrance =
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFranceGrand(
    arbEnsembleSecteursLocalisablesNonFranceGrande,
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
