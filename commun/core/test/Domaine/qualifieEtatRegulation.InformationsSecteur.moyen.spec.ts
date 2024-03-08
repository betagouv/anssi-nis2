import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import {
  fabriqueArb_ReponseInformationsSecteur_GE,
  fabriqueArb_ReponseInformationsSecteur_ME,
} from "../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_ReponseInformationsSecteur_LocalisableGE_Oui_France_AvecEnsembleDe,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_GE,
  fabriqueArbInformationsSecteurAutre,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseDefinitivementReguleEE,
  verificationReponseDefinitivementReguleEI,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  fabriqueArbJamaisOse_ToujoursFrance_StructureGrand,
  fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen,
} from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import {
  arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
  arbEnsembleSecteursAnnexe1,
  arbEnsembleSecteursAnnexe2,
  arbEnsembleSecteursCompositesActivitesAutres,
  arbEnsembleSecteursSimplesActivitesAutres,
  arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
} from "./arbitraires/EnsembleInformationsSecteur.arbitraires";
import {
  arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI,
  arbInformationsSecteur_LocaliseesAutre_Grande_EI,
  arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE,
  arbInformationsSecteur_LocaliseesFrance_Grande_EI,
  arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
} from "./arbitraires/InformationsSecteur.arbitraires";

describe("Secteur", () => {
  describe("Moyens", () => {
    describe("Inrasctructures Numériques", () => {
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_LocalisableGE_Oui_France_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
            ),
          ),
          verificationReponseDefinitivementReguleEE,
        ),
      );
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et localisées en UE ==> toujours définitivement Incertain / Voir autre pays UE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_LocalisableGE_Oui_France_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE,
            ),
          ),
          verificationReponseDefinitivementIncertainAutrePaysUE,
        ),
      );
      it(
        "en suspens / secteurs Infrastructure Numérique + activités EI (ni reg dom ni fournisseur DNS) sans besoin localisation ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_GE(
              arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI,
            ),
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
            fabriqueArb_ReponseInformationsSecteur_LocalisableGE_Oui_France_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesFrance_Grande_EI,
            ),
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
      it(
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureGrand(
            fabriqueArb_ReponseInformationsSecteur_LocalisableGE_Oui_France_AvecEnsembleDe(
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
            fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_GE(
              arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
            ),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
    describe("Secteurs listés", () => {
      it(
        "en suspens / secteur et sous-secteur en annexe 1 ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_ME(
              arbEnsembleSecteursAnnexe1,
            ),
          ),
          verificationReponseDefinitivementReguleEI,
        ),
      );
      it(
        "en suspens / secteur et sous-secteur en annexe 2 ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_ME(
              arbEnsembleSecteursAnnexe2,
            ),
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
            fc.oneof(
              fabriqueArb_ReponseInformationsSecteur_GE(
                arbEnsembleSecteursCompositesActivitesAutres,
              ),
              fabriqueArb_ReponseInformationsSecteur_GE(
                arbEnsembleSecteursSimplesActivitesAutres,
              ),
              fabriqueArb_ReponseInformationsSecteur_GE(
                arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
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
