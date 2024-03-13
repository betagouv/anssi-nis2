import { describe, it } from "vitest";
import { InformationsSecteurPossible } from "../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import { arbEnsembleSecteurs_Infranum_PE_AutreUE } from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
  arbReponseInformationsSecteurPetit,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import {
  fabriqueArbInformationsSecteurAutre,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";

describe("Secteur", () => {
  describe("Petit", () => {
    it(
      "en suspens / secteur autre ==> toujours définitivement non régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          fabriqueArbInformationsSecteurAutre("Petit"),
        ),
        verificationReponseNonRegule,
      ),
    );

    it(
      "en suspens / secteurs+activités localisables et bien localisés ==> toujours définitivement régulé END",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteurLocalisesFrancePetit,
        ),
        fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
      ),
    );
    it(
      "en suspens / secteurs+activités essentielle sans besoin localisation ==> toujours définitivement régulé END",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
        ),
        fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
      ),
    );
    it(
      "en suspens / secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
        ),
        verificationReponseNonRegule,
      ),
    );
    it(
      "en suspens / secteurs localisables et localisé hors France ==> toujours définitivement non-régulé",
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
      "en suspens / secteurs liste non eligible ==> toujours définitivement non-régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteurPetit,
        ),
        verificationReponseNonRegule,
      ),
    );
  });
});
