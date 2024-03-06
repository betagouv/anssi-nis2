import { describe, it } from "vitest";
import {
  assertionArbitraire,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseDefinitivementReguleEE,
  verificationReponseDefinitivementReguleEI,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbEnsembleSecteurs_Infranum_PE_AutreUE,
  arbEnsembleSecteursAnnexe1,
  arbEnsembleSecteursAnnexe2,
} from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import { arbInformationsSecteur_LocaliseesAutre_Grande_EI } from "./arbitraires/InformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteur_AvecActivitesEssentiels_SansBesoinLocalisation,
  arbReponseInformationsSecteur_LocalisesFrance_Grand_EI,
  arbReponseInformationsSecteur_AvecBesoinLoca_GrandEI_LocalisationHorsFrance,
  arbReponseInformationsSecteurFranceGrandInfranumEI,
  arbReponseInformationsSecteurGrandActivitesAutres,
  arbReponseInformationsSecteur_LocalisesAutre_Grand_Infranum_EE,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
  arbReponseInformationsSecteurPetit,
  arbReponseInformationsSecteur_LocalisesFrance_Grand_Infranum_EE,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import {
  fabriqueArbJamaisOse_ToujoursFrance_StructureGrand,
  fabriqueArbJamaisOse_ToujoursFrance_StructurePetit,
} from "./arbitraires/ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueArbInformationsSecteurAutre,
  fabriqueArbitraireCapsuleSecteurGrand,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe,
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
  describe("Grandes", () => {
    describe("Inrasctructures Numériques", () => {
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteur_LocalisesFrance_Grand_Infranum_EE,
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et localisées en UE ==> toujours définitivement Incertain / Voir autre pays UE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            arbReponseInformationsSecteur_LocalisesAutre_Grand_Infranum_EE,
          ),
          verificationReponseDefinitivementIncertainAutrePaysUE,
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
    describe("Gestion TIC et Fournisseurs Numériques", () => {
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
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesAutre_Grande_EI,
            ),
          ),
          verificationReponseDefinitivementIncertainAutrePaysUE,
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
    });
    describe("Secteurs listés", () => {
      it(
        "en suspens / secteur et sous-secteur en annexe 1 ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursAnnexe1),
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteur et sous-secteur en annexe 2 ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursAnnexe2),
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
    });
    describe("Autres Secteurs/ss-secteurs/activités", () => {
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
});
