import { describe, it } from "vitest";
import {
  assertionArbitraire,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseDefinitivementReguleEE,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { arbEnsembleSecteurs_Infranum_PE_AutreUE } from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
  arbReponseInformationsSecteurPetit,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueArbInformationsSecteurAutre,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";

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
      "en suspens / secteurs+activités localisables et bien localisés ==> toujours définitivement régulé EE",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteurLocalisesFrancePetit,
        ),
        verificationReponseDefinitivementReguleEE,
      ),
    );
    it(
      "en suspens / secteurs+activités essentielle sans besoin localisation ==> toujours définitivement régulé EE",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
          arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
        ),
        verificationReponseDefinitivementReguleEE,
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
          fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance(
            arbEnsembleSecteurs_Infranum_PE_AutreUE,
          ),
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
