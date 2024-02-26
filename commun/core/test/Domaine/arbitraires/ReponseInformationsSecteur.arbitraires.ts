import { fc } from "@fast-check/vitest";
import { ActivitesLocalisablesGrand } from "../../../src/Domain/Simulateur/Activite.definitions";
import { SecteurAvecBesoinLocalisationRepresentant } from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { estActiviteInfrastructureNumeriqueAvecBesoinLocalisation } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
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
  arbLocalisationRepresentant_ToujoursFrance,
  arbSecteurInfrascructureNumerique,
} from "./InformationsSecteur.arbitraires";
import {
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre,
  fabriqueArbitraireCapsuleSecteurGrand,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_AvecEnsembleDe,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe,
  fabriqueArbitraireCapsuleSecteurLocalisablePetit_Oui_France,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFranceGrand,
  fabriqueArbitraireCapsuleSecteurPetit,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";

export const arbReponseInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisablePetit_Oui_France(
  arbEnsembleSecteursLocalisablesPetitFrance,
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

arbSecteurInfrascructureNumerique.chain(
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
    arbLocalisationRepresentant_ToujoursFrance,
    fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
      estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
    )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
  ),
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
