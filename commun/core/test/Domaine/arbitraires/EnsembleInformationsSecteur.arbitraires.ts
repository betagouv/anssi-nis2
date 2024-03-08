import { fc } from "@fast-check/vitest";
import {
  InformationSecteurSimple,
  InformationsSecteurAvecBesoinLocalisation,
} from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  fabriqueArbEnsemble_InformationsSecteur_ActivitesAutres,
  fabriqueArbEnsemble_InformationsSecteur_ActivitesListes,
  fabriqueArbEnsemble_InformationsSecteur_ActivitesListesAgno,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE,
  arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE,
  arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
  arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositeActivitesAutres,
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurListesSansSousSecteurNiLocaGrand,
  arbSecteursActivite_Annexe1_SansBesoinLocalisation,
  arbSecteursActivite_Annexe2_SansBesoinLocalisation,
} from "./InformationsSecteur.arbitraires";

export const arbEnsembleSecteursSimples: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbEnsemble_InformationsSecteur_ActivitesListes(
  arbSecteurListesSansSousSecteurNiLocaGrand,
);
export const arbEnsembleSecteursSimplesActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbEnsemble_InformationsSecteur_ActivitesAutres(
  arbSecteurListesSansSousSecteurNiLocaGrand,
);
export const arbEnsembleSecteursAnnexe1 =
  fabriqueArbEnsemble_InformationsSecteur_ActivitesListesAgno(
    arbSecteursActivite_Annexe1_SansBesoinLocalisation,
  );
export const arbEnsembleSecteursAnnexe2 =
  fabriqueArbEnsemble_InformationsSecteur_ActivitesListesAgno(
    arbSecteursActivite_Annexe2_SansBesoinLocalisation,
  );
export const arbEnsembleSecteursComposites =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbInformationsSecteurComposite,
  );
export const arbEnsembleSecteursCompositesActivitesAutres =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbInformationsSecteurCompositeActivitesAutres,
  );
export const arbEnsembleSecteursSimplesEligiblesPetit: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbEnsemble_InformationsSecteur_ActivitesListes(
  arbSecteurActivite_InfrastructureNumerique,
);

export const arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbEnsemble_InformationsSecteur_ActivitesAutres(
  arbSecteurActivite_InfrastructureNumerique,
);
export const arbEnsembleSecteursLocalisablesPetitFrance: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
);

const arbEnsInformationsSecteur_Infranum_ActivitesAvecBesoinLoca_HorsUE_PE =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  );
const arbEnsInformationsSecteur_Infranum_HorsUE_PE =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
  );
export const arbEnsembleSecteurs_AvecBesoinLoca_NonUE: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fc.oneof(
  arbEnsInformationsSecteur_Infranum_ActivitesAvecBesoinLoca_HorsUE_PE,
  arbEnsInformationsSecteur_Infranum_HorsUE_PE,
);
export const arbEnsembleSecteurs_Infranum_PE_AutreUE =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE,
  );
/**
 * Ensemble de Secteurs
 * - "Gestion des services TIC
 * - "Fournisseurs numériques"
 * Pas de restriction sur les activités
 */
export const arbEnsembleSecteurs_AvecBesoinLoca_GrandEI: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Grand">>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE,
);
