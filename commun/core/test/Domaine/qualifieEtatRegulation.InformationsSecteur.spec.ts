import { describe, it } from "vitest";
import {
  assertionArbitraire,
  verificationReponseDefinitivementReguleEE,
  verificationReponseDefinitivementReguleEI,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
  arbReponseInformationsSecteur_LocalisesFrance_Grand_EI,
  arbReponseInformationsSecteur_AvecBesoinLoca_GrandEI_LocalisationHorsFrance,
  arbReponseInformationsSecteurFranceGrandInfranumEI,
  arbReponseInformationsSecteurGrand,
  arbReponseInformationsSecteurGrandActivitesAutres,
  arbReponseInformationsSecteurLocalisesFranceGrandInfranumEE,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteurLocalisesHorsFrancePetit,
  arbReponseInformationsSecteurPetit,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import {
  fabriqueArbJamaisOse_ToujoursFrance_StructureGrand,
  fabriqueArbJamaisOse_ToujoursFrance_StructurePetit,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import { fabriqueArbInformationsSecteurAutre } from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";

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
          arbReponseInformationsSecteurLocalisesHorsFrancePetit,
        ),
        verificationReponseNonRegule,
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
  describe("Grandes", () => {
    describe("Inrasctructures Numériques", () => {
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurLocalisesFranceGrandInfranumEE,
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteurs Infrastructure Numérique + activités EI (ni reg dom ni fournisseur DNS) sans besoin localisation ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteurFranceGrandInfranumEI,
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
    });
    it(
      "en suspens / secteur et sous-secteur listés ==> toujours définitivement régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
          arbReponseInformationsSecteurGrand,
        ),
        verificationReponseDefinitivementReguleEI,
      ),
    );
    it(
      "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
          arbReponseInformationsSecteur_LocalisesFrance_Grand_EI,
        ),
        verificationReponseDefinitivementReguleEI,
      ),
    );

    it(
      "en suspens / secteurs+activités EI localisables et localisés hors-france ==> toujours définitivement non-régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
          arbReponseInformationsSecteur_AvecBesoinLoca_GrandEI_LocalisationHorsFrance,
        ),
        verificationReponseNonRegule,
      ),
    );
    it(
      "en suspens / secteurs/sous-secteur listés, uniquement activités autres ==> toujours définitivement non-régulé",
      assertionArbitraire(
        fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
          arbReponseInformationsSecteurGrandActivitesAutres,
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