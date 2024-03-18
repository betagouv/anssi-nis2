import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  RepInfoSecteur,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { fabriqueArb_ReponseInformationsSecteur_ME } from "../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille,
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourEtab,
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays,
  fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille,
  fabriqueArbInformationsSecteurAutre,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
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
import { arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI } from "./arbitraires/InformationsSecteur.arbitraires";
import {
  arbLocalisationEtablissementPrincipal_AutreUE,
  arbLocalisationEtablissementPrincipal_France,
} from "./arbitraires/LocalisationEtablissementPrincipal.arbitraires";
import {
  arbLocalisationsServices_ContientAutreUE_SansFrance,
  arbLocalisationsServices_ContientFrance,
  arbLocalisationsServices_ContientUniquementHorsUE,
} from "./arbitraires/LocalisationsServices.arbitraires";

describe("Secteur", () => {
  describe("Moyens - En suspens", () => {
    describe("Inrasctructures Numériques", () => {
      describe("Fournisseur de réseaux de communications électroniques publics et Fournisseur de services de communications électroniques accessibles au public", () => {
        it(
          "France, à minima ==> Définitivement EE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays(
                "infrastructureNumerique",
              )(
                "fournisseurReseauxCommunicationElectroniquesPublics",
                "fournisseurServiceCommunicationElectroniquesPublics",
              )("Moyen")(arbLocalisationsServices_ContientFrance),
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteEssentielle,
            ),
          ),
        );
        it(
          "Autre(s) EM de l'UE, à minima ==> Définitivement Régulé autre",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays(
                "infrastructureNumerique",
              )(
                "fournisseurReseauxCommunicationElectroniquesPublics",
                "fournisseurServiceCommunicationElectroniquesPublics",
              )("Moyen")(arbLocalisationsServices_ContientAutreUE_SansFrance),
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.AutreEtatMembreUE,
            ),
          ),
        );
        it(
          "État(s) hors UE ==> Définitivement Non régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays(
                "infrastructureNumerique",
              )(
                "fournisseurReseauxCommunicationElectroniquesPublics",
                "fournisseurServiceCommunicationElectroniquesPublics",
              )("Moyen")(arbLocalisationsServices_ContientUniquementHorsUE),
            ),
            verificationReponseNonRegule,
          ),
        );
      });

      describe("Fournisseur de services DNS, à l’exclusion des opérateurs de serveurs racines de noms de domaines ou Registres de noms de domaines de premier niveau", () => {
        it(
          "France premiere question ==> definitivement EE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourEtab(
                "infrastructureNumerique",
              )(
                "fournisseurServicesDNS",
                "registresNomsDomainesPremierNiveau",
              )("Moyen")(arbLocalisationEtablissementPrincipal_France),
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteEssentielle,
            ),
          ),
        );
        it(
          "France premiere question ==> definitivement Autre État Membre UE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
              fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourEtab(
                "infrastructureNumerique",
              )(
                "fournisseurServicesDNS",
                "registresNomsDomainesPremierNiveau",
              )("Moyen")(arbLocalisationEtablissementPrincipal_AutreUE),
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.AutreEtatMembreUE,
            ),
          ),
        );
      });
      it(
        "en suspens / secteurs Infrastructure Numérique + activités EI (ni reg dom ni fournisseur DNS) sans besoin localisation ==> toujours définitivement régulé EI",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_ME(
              arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI as fc.Arbitrary<
                Set<RepInfoSecteur<"Moyen">>
              >,
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
            )("prestataireServiceConfianceQualifie")("Moyen") as fc.Arbitrary<
              ReponseInformationsSecteur<"Moyen">
            >,
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
            )("Moyen") as fc.Arbitrary<ReponseInformationsSecteur<"Moyen">>,
          ),
          fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
        ),
      );
      it(
        "autre Activite Infrastructure Numerique (non listée) ==> définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
              "infrastructureNumerique",
            )("autreActiviteInfrastructureNumerique")(
              "Moyen",
            ) as unknown as fc.Arbitrary<ReponseInformationsSecteur<"Moyen">>,
          ),
          verificationReponseNonRegule,
        ),
      );
    });
    describe("Gestion TIC et Fournisseurs Numériques", () => {
      // it.skip(
      //   "*** Raison Skip *** n'existe plus dans le nouveau modèle" +
      //     "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
      //   assertionArbitraire(
      //     fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
      //       fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe(
      //         arbInformationsSecteur_LocaliseesFrance_Grande_EI,
      //       ),
      //     ),
      //     fabriqueVerificationReponseDefinitivementRegule(TE.EntiteImportante),
      //   ),
      // );
      // it.skip(
      //   "*** Raisons Skip *** : activit'e localisables prises en compte par ailleurs " +
      //     "en suspens / secteurs+activités EI localisables et bien localisés ==> toujours définitivement régulé EI",
      //   assertionArbitraire(
      //     fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
      //       fabriqueArb_ReponseInformationsSecteur_Localisable_Oui_France_ME_AvecEnsembleDe(
      //         arbInformationsSecteur_LocaliseesAutre_Grande_EI,
      //       ),
      //     ),
      //     verificationReponseDefinitivementIncertainAutrePaysUE,
      //   ),
      // );

      it.skip(
        "*** Raisons Skip *** : activit'e localisables prises en compte par ailleurs " +
          "en suspens / secteurs+activités EI localisables et localisés hors-france ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArb_ReponseInformationsSecteur_LocalisableUe_HorsFrance_PourTaille(
              "Moyen",
            )(
              arbEnsembleSecteurs_AvecBesoinLoca_GrandEI as fc.Arbitrary<
                Set<RepInfoSecteur<"Moyen">>
              >,
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
              arbEnsembleSecteursAnnexe1 as fc.Arbitrary<
                Set<RepInfoSecteur<"Moyen">>
              >,
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
              arbEnsembleSecteursAnnexe2 as fc.Arbitrary<
                Set<RepInfoSecteur<"Moyen">>
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
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fc.oneof(
              fabriqueArb_ReponseInformationsSecteur_ME(
                arbEnsembleSecteursCompositesActivitesAutres as fc.Arbitrary<
                  Set<RepInfoSecteur<"Moyen">>
                >,
              ),
              fabriqueArb_ReponseInformationsSecteur_ME(
                arbEnsembleSecteursSimplesActivitesAutres as fc.Arbitrary<
                  Set<RepInfoSecteur<"Moyen">>
                >,
              ),
              fabriqueArb_ReponseInformationsSecteur_ME(
                arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres as fc.Arbitrary<
                  Set<RepInfoSecteur<"Moyen">>
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
          fabriqueArbJamaisOse_ToujoursFrance_StructureMoyen(
            fabriqueArbInformationsSecteurAutre("Moyen"),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
  });
});
