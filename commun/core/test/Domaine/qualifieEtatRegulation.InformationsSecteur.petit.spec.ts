import { describe, it } from "vitest";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import { arbEnsembleSecteurs_Infranum_PE_AutreUE } from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteur_Infranum_ActiviteConfianceQualifie,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
  arbReponseInformationsSecteurPetit,
  arbReponseInformationsSecteur_Infranum_ActiviteConfianceNonQualifie,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import {
  fabriqueArbInformationsSecteurAutre,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";

describe("Secteur", () => {
  describe("Petit", () => {
    describe("Décision en suspens", () => {
      describe("Infrastructure Numérique", () => {
        it(
          "secteurs+activités localisables et bien localisés ==> toujours définitivement régulé END",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              arbReponseInformationsSecteurLocalisesFrancePetit,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteEssentielle,
            ),
          ),
        );

        it(
          "secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
            ),
            verificationReponseNonRegule,
          ),
        );
        it(
          "secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
                "Petit",
              )(arbEnsembleSecteurs_Infranum_PE_AutreUE),
            ),
            verificationReponseDefinitivementIncertainAutrePaysUE,
          ),
        );
        it(
          "Prestataire de services de confiance qualifié ==> toujours définitivement régulé EE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              arbReponseInformationsSecteur_Infranum_ActiviteConfianceQualifie,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteEssentielle,
            ),
          ),
        );
        it(
          "Prestataire de services de confiance non qualifié ==> toujours définitivement régulé EI",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              arbReponseInformationsSecteur_Infranum_ActiviteConfianceNonQualifie,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteImportante,
            ),
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
