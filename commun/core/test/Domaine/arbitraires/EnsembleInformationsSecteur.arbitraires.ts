import { fc } from "@fast-check/vitest";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationSecteurSimple,
  InformationsSecteurAvecBesoinLocalisation,
} from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositeActivitesAutres,
  arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE,
  arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurListesSansSousSecteurNiLocaGrand,
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
  arbSecteursActivite_Annexe1_SansBesoinLocalisation,
  arbSecteursActivite_Annexe2_SansBesoinLocalisation,
  arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE,
} from "./InformationsSecteur.arbitraires";
import {
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteurAgno,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";

export const arbEnsembleSecteursSimples: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurListesSansSousSecteurNiLocaGrand.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
  ),
);
export const arbEnsembleSecteursSimplesActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurListesSansSousSecteurNiLocaGrand.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteAutre),
  ),
);
export const arbEnsembleSecteursAnnexe1 =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbSecteursActivite_Annexe1_SansBesoinLocalisation.chain(
      fabriqueArbitraireEnsembleActivitesPourSecteurAgno(estActiviteListee),
    ),
  );
export const arbEnsembleSecteursAnnexe2 =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbSecteursActivite_Annexe2_SansBesoinLocalisation.chain(
      fabriqueArbitraireEnsembleActivitesPourSecteurAgno(estActiviteListee),
    ),
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
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
  ),
);
export const arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteAutre),
  ),
);
export const arbEnsembleSecteursLocalisablesPetitFrance: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fabriqueArbitrairesEnsembleInformationsSecteurs<
  InformationsSecteurAvecBesoinLocalisation<"Petit">
>(arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite);

export const arbEnsembleSecteurs_AvecBesoinLoca_NonUE: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Petit">
  >(
    arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  ),
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Petit">
  >(arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE),
);
export const arbEnsembleSecteurs_Infranum_PE_AutreUE =
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Petit">
  >(arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE);
/**
 * Ensemble de Secteurs
 * - "Gestion des services TIC
 * - "Fournisseurs numériques"
 * Pas de restriction sur les activités
 */
export const arbEnsembleSecteurs_AvecBesoinLoca_GrandEI: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Grand">>
> = fabriqueArbitrairesEnsembleInformationsSecteurs<
  InformationsSecteurAvecBesoinLocalisation<"Grand">
>(arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE);
