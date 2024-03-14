import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";
import { fabriqueArb_ReponseInformationsSecteur_ME } from "../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille,
  fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille,
  fabriqueArbInformationsSecteurAutre,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
  verificationReponseDefinitivementIncertainAutrePaysUE,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
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
  describe("Moyens - En suspens", () => {
    describe("Inrasctructures Numériques", () => {
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et bien localisés ==> toujours définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
            ),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
        ),
      );
      it(
        "en suspens / secteurs+activités EE localisables (reg dom et fournisseur DNS) et localisées en UE ==> toujours définitivement Incertain / Voir autre pays UE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE,
            ),
          ),
          verificationReponseDefinitivementIncertainAutrePaysUE,
        ),
      );
      it(
        "en suspens / secteurs Infrastructure Numérique + activités EI (ni reg dom ni fournisseur DNS) sans besoin localisation ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_ME(
              arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI,
            ),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );

      it(
        "Prestataire de services de confiance qualifié ==> définitivement régulé EE",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
              "infrastructureNumerique",
            )("prestataireServiceConfianceQualifie")("Moyen"),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteEssentielle),
        ),
      );
      it(
        "Prestataire de services de confiance non-qualifié ou Fournisseur de points d’échange internet ==> définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
              "infrastructureNumerique",
            )(
              "prestataireServiceConfianceNonQualifie",
              "fournisseurPointEchangeInternet",
            )("Moyen"),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );
    });
    describe("Gestion TIC et Fournisseurs Numériques", () => {
      it(
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesFrance_Grande_EI,
            ),
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );
      it(
        "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe(
              arbInformationsSecteur_LocaliseesAutre_Grande_EI,
            ),
          ),
          verificationReponseDefinitivementIncertainAutrePaysUE,
        ),
      );

      it(
        "en suspens / secteurs+activités EI localisables et localisés hors-france ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
              "Moyen",
            )(arbEnsembleSecteurs_AvecBesoinLoca_GrandEI),
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
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
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
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );
    });
    describe("Autres Secteurs/ss-secteurs/activités", () => {
      it(
        "en suspens / secteurs/sous-secteur listés, uniquement activités autres ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fc.oneof(
              fabriqueArb_ReponseInformationsSecteur_ME(
                arbEnsembleSecteursCompositesActivitesAutres,
              ),
              fabriqueArb_ReponseInformationsSecteur_ME(
                arbEnsembleSecteursSimplesActivitesAutres,
              ),
              fabriqueArb_ReponseInformationsSecteur_ME(
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
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArbInformationsSecteurAutre("Moyen"),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
  });
});
