import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { ValeursActivitesInfrastructureNumerique } from "../../src/Domain/Simulateur/Activite.valeurs";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";
import { ReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites,
  fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites_PourEtab,
  fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites_PourServiceDansPays,
  fabriqueArbInformationsSecteurAutre,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  verifieReponseDefinitivementRegule,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import {
  arbLocalisationEtablissementPrincipal_AutreUE,
  arbLocalisationEtablissementPrincipal_France,
} from "./arbitraires/LocalisationEtablissementPrincipal.arbitraires";
import {
  arbLocalisationsServices_ContientAutreUE_SansFrance,
  arbLocalisationsServices_ContientFrance,
  arbLocalisationsServices_ContientUniquementHorsUE,
} from "./arbitraires/LocalisationsServices.arbitraires";
import { arbReponseInformationsSecteurPetit } from "./arbitraires/ReponseInformationsSecteur.arbitraires";

describe("Secteur", () => {
  describe("Petit", () => {
    const fabriqueArbJamaisOse_ToujoursFrance =
      fabriqueArbJamaisOse_ToujoursFrance_StructurePetit;
    const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourServiceDansPays =
      fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites_PourServiceDansPays(
        "Petit",
      );
    const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourEtab =
      fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites_PourEtab(
        "Petit",
      );
    const fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites =
      fabriqueArb_EnsInfosSecteurSingleton_PourTaille_PourSecteur_PourActivites(
        "Petit",
      );
    describe("Décision en suspens", () => {
      describe("Infrastructure Numérique", () => {
        const fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourServiceDansPays =
          fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourServiceDansPays(
            "infrastructureNumerique",
          );
        const fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourEtab =
          fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourEtab(
            "infrastructureNumerique",
          );

        const fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites =
          fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites(
            "infrastructureNumerique",
          );
        describe("Fournisseur de réseaux de communications électroniques publics et Fournisseur de services de communications électroniques accessibles au public", () => {
          it(
            "France, à minima ==> Définitivement EI",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance(
                fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourServiceDansPays(
                  "fournisseurReseauxCommunicationElectroniquesPublics",
                  "fournisseurServiceCommunicationElectroniquesPublics",
                )(arbLocalisationsServices_ContientFrance),
              ),
              verifieReponseDefinitivementRegule(TE.EntiteImportante),
            ),
          );
          it(
            "Autre(s) EM de l'UE, à minima ==> Définitivement Régulé autre",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance(
                fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourServiceDansPays(
                  "fournisseurReseauxCommunicationElectroniquesPublics",
                  "fournisseurServiceCommunicationElectroniquesPublics",
                )(arbLocalisationsServices_ContientAutreUE_SansFrance),
              ),
              verifieReponseDefinitivementRegule(TE.AutreEtatMembreUE),
            ),
          );
          it(
            "État(s) hors UE ==> Définitivement Non régulé",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance(
                fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourServiceDansPays(
                  "fournisseurReseauxCommunicationElectroniquesPublics",
                  "fournisseurServiceCommunicationElectroniquesPublics",
                )(arbLocalisationsServices_ContientUniquementHorsUE),
              ),
              verificationReponseNonRegule,
            ),
          );
        });
        describe(
          "Fournisseur de services DNS, à l’exclusion des opérateurs de serveurs racines de noms de domaines " +
            "ou Registres de noms de domaines de premier niveau",
          () => {
            it(
              "France premiere question ==> definitivement EE",
              assertionArbitraire(
                fabriqueArbJamaisOse_ToujoursFrance(
                  fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourEtab(
                    "fournisseurServicesDNS",
                    "registresNomsDomainesPremierNiveau",
                  )(arbLocalisationEtablissementPrincipal_France),
                ),
                verifieReponseDefinitivementRegule(TE.EntiteEssentielle),
              ),
            );
            it(
              "Autre à l'une des questions ==> definitivement Autre État Membre UE",
              assertionArbitraire(
                fabriqueArbJamaisOse_ToujoursFrance(
                  fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites_PourEtab(
                    "fournisseurServicesDNS",
                    "registresNomsDomainesPremierNiveau",
                  )(arbLocalisationEtablissementPrincipal_AutreUE),
                ),
                verifieReponseDefinitivementRegule(TE.AutreEtatMembreUE),
              ),
            );
          },
        );
        it(
          "Prestataire de services de confiance qualifié ==> définitivement régulé EE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance(
              fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites(
                "prestataireServiceConfianceQualifie",
              ),
            ),
            verifieReponseDefinitivementRegule(TE.EntiteEssentielle),
          ),
        );
        it(
          "Prestataire de services de confiance non qualifié ==> définitivement régulé EI",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance(
              fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites(
                "prestataireServiceConfianceNonQualifie",
              ),
            ),
            verifieReponseDefinitivementRegule(TE.EntiteImportante),
          ),
        );
        it(
          "Fournisseur des services d’enregistrement de noms de domaine ==> Enregistrement uniquement",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance(
              fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites(
                "fournisseurServicesEnregristrementNomDomaine",
              ),
            ),
            verifieReponseDefinitivementRegule(TE.EnregistrementUniquement),
          ),
        );
        it(
          "autre Activite Infrastructure Numerique (non listée) ==> définitivement non régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance(
              fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites(
                "autreActiviteInfrastructureNumerique",
              ),
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
                "fournisseurServicesEnregristrementNomDomaine",
                "autreActiviteInfrastructureNumerique",
              ].includes(activite),
          );
        it(
          "autre Activite listée dans Infrastructure Numerique  ==> définitivement non régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance(
              fabriqueArb_EnsInfosSecteurSingleton_Infranum_PourActivites(
                ...activitesPENonReguleesPE,
              ) as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            verificationReponseNonRegule,
          ),
        );
      });

      it(
        "Autres secteurs liste non eligible PE ==> toujours définitivement non-régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance(
            arbReponseInformationsSecteurPetit,
          ),
          verificationReponseNonRegule,
        ),
      );
      it(
        "Autres secteur activité ==> toujours définitivement non régulé",
        assertionArbitraire(
          fabriqueArbJamaisOse_ToujoursFrance(
            fabriqueArbInformationsSecteurAutre("Petit"),
          ),
          verificationReponseNonRegule,
        ),
      );
    });
  });
});
