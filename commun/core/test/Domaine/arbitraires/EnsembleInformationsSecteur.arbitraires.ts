import { fc } from "@fast-check/vitest";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationsSecteurAvecBesoinLocalisation,
  InformationSecteurSimple,
  InformationsSecteursCompositeListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositeActivitesAutres,
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsFrance,
  arbInformationsSecteurLocaliseesHorsFrancePetite,
  arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE,
  arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
  arbSecteurInfrascructureNumerique,
  arbSecteurListesSansSousSecteurNiLocaGrand,
  arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite,
} from "./InformationsSecteur.arbitraires";
import {
  fabriqueArbitraireEnsembleActivitesPourSecteur,
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
export const arbEnsembleSecteursSimplesEligiblesPetit: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
  ),
);
export const arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurInfrascructureNumerique.chain(
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
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Grand">
  >(arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE),
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationsSecteurAvecBesoinLocalisation<"Grand">
  >(arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsFrance),
);
export const arbEnsembleSecteursComposites: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurComposite,
);
export const arbEnsembleSecteursCompositesActivitesAutres: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurCompositeActivitesAutres,
);
