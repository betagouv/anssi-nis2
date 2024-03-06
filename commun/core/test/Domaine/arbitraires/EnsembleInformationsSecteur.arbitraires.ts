import { fc } from "@fast-check/vitest";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationsSecteurAvecBesoinLocalisation,
  InformationSecteurSimple,
} from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositeActivitesAutres,
  arbInformationsSecteurLocaliseesHorsFrancePetite,
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE,
  arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurListesSansSousSecteurNiLocaGrand,
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
  arbSecteursActivite_Annexe1_SansBesoinLocalisation,
  arbSecteursActivite_Annexe2_SansBesoinLocalisation,
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

export const arbEnsembleSecteursLocalisablesNonFrance: fc.Arbitrary<
  Set<InformationsSecteurAvecBesoinLocalisation<"Petit">>
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Petit">
  >(
    arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
  ),
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Petit">
  >(arbInformationsSecteurLocaliseesHorsFrancePetite),
);
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
