import { fc } from "@fast-check/vitest";
import {
  InformationsSecteurAvecBesoinLocalisation,
  InformationsSecteurPossible,
} from "../../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import {
  fabriqueArb_EnsInformationsSecteur_ActivitesAutres,
  fabriqueArb_EnsInformationsSecteur_ActivitesListees,
  fabriqueArb_EnsInformationsSecteur_ActivitesListeesAgno,
  fabriqueArb_EnsInformationsSecteurPossible,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE,
  arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE,
  arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
  arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositeActivitesAutres,
} from "./InformationsSecteur.arbitraires";
import {
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
  arbSecteursActivite_Annexe1_SansBesoinLocalisation,
  arbSecteursActivite_Annexe2_SansBesoinLocalisation,
} from "./SecteurActivite.arbitraires";

export const arbEnsembleSecteursSimples =
  fabriqueArb_EnsInformationsSecteur_ActivitesListees(
    arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
  );
export const arbEnsembleSecteursSimplesActivitesAutres: fc.Arbitrary<
  Set<InformationsSecteurPossible<"Grand">>
> = fabriqueArb_EnsInformationsSecteur_ActivitesAutres(
  arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
);
export const arbEnsembleSecteursAnnexe1 =
  fabriqueArb_EnsInformationsSecteur_ActivitesListeesAgno(
    arbSecteursActivite_Annexe1_SansBesoinLocalisation,
  );
export const arbEnsembleSecteursAnnexe2 =
  fabriqueArb_EnsInformationsSecteur_ActivitesListeesAgno(
    arbSecteursActivite_Annexe2_SansBesoinLocalisation,
  );
export const arbEnsembleSecteursComposites =
  fabriqueArb_EnsInformationsSecteurPossible(arbInformationsSecteurComposite);
export const arbEnsembleSecteursCompositesActivitesAutres =
  fabriqueArb_EnsInformationsSecteurPossible(
    arbInformationsSecteurCompositeActivitesAutres,
  );
export const arbEnsembleSecteursSimplesEligiblesPetit: fc.Arbitrary<
  Set<InformationsSecteurPossible<"Petit">>
> = fabriqueArb_EnsInformationsSecteur_ActivitesListees(
  arbSecteurActivite_InfrastructureNumerique,
);

export const arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres: fc.Arbitrary<
  Set<InformationsSecteurPossible<"Petit">>
> = fabriqueArb_EnsInformationsSecteur_ActivitesAutres(
  arbSecteurActivite_InfrastructureNumerique,
);
export const arbEnsembleSecteursLocalisablesPetitFrance: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fabriqueArb_EnsInformationsSecteurPossible(
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
) as fc.Arbitrary<Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>>;

const arbEnsInformationsSecteur_Infranum_ActivitesAvecBesoinLoca_HorsUE_PE =
  fabriqueArb_EnsInformationsSecteurPossible(
    arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  );
const arbEnsInformationsSecteur_Infranum_HorsUE_PE =
  fabriqueArb_EnsInformationsSecteurPossible<"Petit">(
    arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE as fc.Arbitrary<
      InformationsSecteurPossible<"Petit">
    >,
  );
export const arbEnsembleSecteurs_AvecBesoinLoca_NonUE: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fc.oneof(
  arbEnsInformationsSecteur_Infranum_ActivitesAvecBesoinLoca_HorsUE_PE,
  arbEnsInformationsSecteur_Infranum_HorsUE_PE,
) as fc.Arbitrary<Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>>;
export const arbEnsembleSecteurs_Infranum_PE_AutreUE =
  fabriqueArb_EnsInformationsSecteurPossible(
    arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE,
  ) as fc.Arbitrary<Set<InformationsSecteurPossible<"Petit">>>;
/**
 * Ensemble de Secteurs
 * - "Gestion des services TIC
 * - "Fournisseurs numériques"
 * Pas de restriction sur les activités
 */
export const arbEnsembleSecteurs_AvecBesoinLoca_GrandEI: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Grand">>
> = fabriqueArb_EnsInformationsSecteurPossible<
  "Grand",
  InformationsSecteurAvecBesoinLocalisation<"Grand">
>(arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE);
