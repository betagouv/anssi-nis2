import { describe, it } from "vitest";
import {
  fabriqueArbInformationsSecteurAutre,
  fabriqueArbitraireCapsuleSecteurGrand,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France_AvecEnsembleDe,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseDefinitivementReguleEE,
  verificationReponseDefinitivementReguleEI,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbEnsembleSecteursAnnexe1,
  arbEnsembleSecteursAnnexe2,
} from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import { arbInformationsSecteur_LocaliseesAutre_Grande_EI } from "./arbitraires/InformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteur_AvecBesoinLoca_GrandEI_LocalisationHorsFrance,
  arbReponseInformationsSecteur_LocalisesAutre_Grand_Infranum_EE,
  arbReponseInformationsSecteur_LocalisesFrance_Grand_EI,
  arbReponseInformationsSecteur_LocalisesFrance_Grand_Infranum_EE,
  arbReponseInformationsSecteurFranceGrandInfranumEI,
  arbReponseInformationsSecteurGrandActivitesAutres,
} from "./arbitraires/ReponseInformationsSecteur.arbitraires";
import { fabriqueArbJamaisOse_ToujoursFrance_StructureGrand } from "./arbitraires/ResultatEvaluationRegulation.arbitraire";

describe("Secteur", () => {
  describe("Moyens", () => {
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
