import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  RepInfoSecteur,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { fabriqueArb_ReponseInformationsSecteur_GE } from "../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille,
  fabriqueArbInformationsSecteurAutre,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructureGrand } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import {
  arbEnsembleSecteursAnnexe1,
  arbEnsembleSecteursAnnexe2,
  arbEnsembleSecteursCompositesActivitesAutres,
  arbEnsembleSecteursSimplesActivitesAutres,
  arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
} from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import { arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI } from "./arbitraires/InformationsSecteur.arbitraires";

describe("Secteur", () => {
  describe("Grandes", () => {
    describe("Inrasctructures Numériques", () => {
      // it.skip(
      //   "*** Raisons Skip *** : activit'e localisables prises en compte par ailleurs " +
      //     "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et bien localisés ==> toujours définitivement régulé EE",
      //   assertionArbitraire(
      //     fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
      //       fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_GE_AvecEnsembleDe(
      //         arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
      //       ),
      //     ),
      //     fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
      //   ),
      // );
      // it.skip(
      //   "*** Raisons Skip *** : activit'e localisables prises en compte par ailleurs " +
      //     "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et localisées en UE ==> toujours définitivement Incertain / Voir autre pays UE",
      //   assertionArbitraire(
      //     fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
      //       fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_GE_AvecEnsembleDe(
      //         arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE,
      //       ),
      //     ),
      //     verificationReponseDefinitivementIncertainAutrePaysUE,
      //   ),
      // );

      it.skip(
        "***Raison Skip*** : Plus en adéquation avec arbre 07/03" +
          "en suspens / secteurs Infrastructure Numérique + activités EI (ni reg dom ni fournisseur DNS) sans besoin localisation ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_GE(
              arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI as fc.Arbitrary<
                Set<RepInfoSecteur<"Grand">>
              >,
            ),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );
      it(
        "Prestataire de services de confiance (non-)qualifié ou Fournisseur de points d’échange internet ==> définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
              "infrastructureNumerique",
            )(
              "prestataireServiceConfianceQualifie",
              "prestataireServiceConfianceNonQualifie",
              "fournisseurPointEchangeInternet",
            )("Grand") as fc.Arbitrary<ReponseInformationsSecteur<"Grand">>,
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
        ),
      );
      it(
        "autre Activite Infrastructure Numerique (non listée) ==> définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
              "infrastructureNumerique",
            )("autreActiviteInfrastructureNumerique")(
              "Grand",
            ) as unknown as fc.Arbitrary<ReponseInformationsSecteur<"Grand">>,
          ),
          verificationReponseNonRegule,
        ),
      );
    });
    describe("Secteurs listés", () => {
      it(
        "en suspens / secteur et sous-secteur en annexe 1 ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_GE(
              arbEnsembleSecteursAnnexe1 as fc.Arbitrary<
                Set<RepInfoSecteur<"Grand">>
              >,
            ),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
        ),
      );
      it(
        "en suspens / secteur et sous-secteur en annexe 2 ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_GE(
              arbEnsembleSecteursAnnexe2 as fc.Arbitrary<
                Set<RepInfoSecteur<"Grand">>
              >,
            ),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );
    });
    describe("Autres Secteurs/ss-secteurs/activités", () => {
      it(
        "en suspens / secteurs/sous-secteur listés, uniquement activités autres ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fc.oneof(
              fabriqueArb_ReponseInformationsSecteur_GE(
                arbEnsembleSecteursCompositesActivitesAutres as fc.Arbitrary<
                  Set<RepInfoSecteur<"Grand">>
                >,
              ),
              fabriqueArb_ReponseInformationsSecteur_GE(
                arbEnsembleSecteursSimplesActivitesAutres,
              ),
              fabriqueArb_ReponseInformationsSecteur_GE(
                arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres as fc.Arbitrary<
                  Set<RepInfoSecteur<"Grand">>
                >,
              ),
            ),
          ),
          verificationReponseNonRegule,
        ),
      );
      it(
        "en suspens / secteur autre Grand ==> toujours définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArbInformationsSecteurAutre("Grand"),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
  });
});
