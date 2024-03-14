import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { ValeursActivitesInfrastructureNumerique } from "../../src/Domain/Simulateur/Activite.valeurs";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";
import { ReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille,
  fabriqueArbInformationsSecteurAutre,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import { arbReponseInformationsSecteurPetit } from "./arbitraires/ReponseInformationsSecteur.arbitraires";

describe("Secteur", () => {
  describe("Petit", () => {
    describe("Décision en suspens", () => {
      describe("Infrastructure Numérique", () => {
        // it.skip(
        //   "*** Raison Skip *** n'existe plus dans le nouveau modèle" +
        //     "secteurs+activités localisables et bien localisés ==> toujours définitivement régulé END",
        //   assertionArbitraire(
        //     fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
        //       arbReponseInformationsSecteurLocalisesFrancePetit,
        //     ),
        //     fabriqueVerificationReponseDefinitivementRegule(
        //       TE.EntiteEssentielle,
        //     ),
        //   ),
        // );

        // it.skip(
        //   "*** Raison Skip *** n'existe plus dans le nouveau modèle" +
        //     "secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
        //   assertionArbitraire(
        //     fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
        //       arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
        //     ),
        //     verificationReponseNonRegule,
        //   ),
        // );
        // it.skip(
        //   "*** Raison Skip *** n'existe plus dans le nouveau modèle" +
        //     "secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
        //   assertionArbitraire(
        //     fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
        //       fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
        //         "Petit",
        //       )(arbEnsembleSecteurs_Infranum_PE_AutreUE),
        //     ),
        //     verificationReponseDefinitivementIncertainAutrePaysUE,
        //   ),
        // );
        it(
          "Prestataire de services de confiance qualifié ==> définitivement régulé EE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
                "infrastructureNumerique",
              )("prestataireServiceConfianceQualifie")("Petit") as fc.Arbitrary<
                ReponseInformationsSecteur<"Petit">
              >,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteEssentielle,
            ),
          ),
        );
        it(
          "Prestataire de services de confiance non qualifié ==> définitivement régulé EI",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
                "infrastructureNumerique",
              )("prestataireServiceConfianceNonQualifie")(
                "Petit",
              ) as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteImportante,
            ),
          ),
        );
        it(
          "autre Activite Infrastructure Numerique (non listée) ==> définitivement non régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
                "infrastructureNumerique",
              )("autreActiviteInfrastructureNumerique")(
                "Petit",
              ) as unknown as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            verificationReponseNonRegule,
          ),
        );
        const activitesPENonReguleesPE =
          ValeursActivitesInfrastructureNumerique.filter(
            (activite) =>
              ![
                "fournisseurReseauxCommunicationElectroniquesPublics",
                "fournisseurServiceCommunicationElectroniquesPublics",
                "registresNomsDomainesPremierNiveau",
                "fournisseurServicesDNS",
                "prestataireServiceConfianceQualifie",
                "prestataireServiceConfianceNonQualifie",
                "autreActiviteInfrastructureNumerique",
              ].includes(activite),
          );
        it(
          "autre Activite listée dans Infrastructure Numerique  ==> définitivement non régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
                "infrastructureNumerique",
              )(...activitesPENonReguleesPE)(
                "Petit",
              ) as unknown as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            verificationReponseNonRegule,
          ),
        );
      });

      it(
        "Autres secteurs liste non eligible PE ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteurPetit,
          ),
          verificationReponseNonRegule,
        ),
      );
      it(
        "Autres secteur activité ==> toujours définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            fabriqueArbInformationsSecteurAutre("Petit"),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
  });
});
