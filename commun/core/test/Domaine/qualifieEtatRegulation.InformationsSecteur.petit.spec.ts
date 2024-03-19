import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { ValeursActivitesInfrastructureNumerique } from "../../src/Domain/Simulateur/Activite.valeurs";
import { TypeEntite as TE } from "../../src/Domain/Simulateur/Regulation.definitions";
import { ReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import {
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourEtab,
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille,
  fabriqueArbInformationsSecteurAutre,
  fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays,
} from "../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  assertionArbitraire,
  fabriqueVerificationReponseDefinitivementRegule,
  verificationReponseNonRegule,
} from "../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import {
  arbLocalisationEtablissementPrincipal_AutreUE,
  arbLocalisationEtablissementPrincipal_France,
} from "./arbitraires/LocalisationEtablissementPrincipal.arbitraires";
import {
  arbLocalisationsServices_ContientFrance,
  arbLocalisationsServices_ContientAutreUE_SansFrance,
  arbLocalisationsServices_ContientUniquementHorsUE,
} from "./arbitraires/LocalisationsServices.arbitraires";
import { arbReponseInformationsSecteurPetit } from "./arbitraires/ReponseInformationsSecteur.arbitraires";

describe("Secteur", () => {
  describe("Petit", () => {
    const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPays_PE =
      fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourServiceDansPays(
        "Petit",
      );
    const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourEtab_PE =
      fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille_PourEtab(
        "Petit",
      );
    const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaille_PE =
      fabriqueArb_EnsInfosSecteurSingleton_PourSecteur_PourActivites_PourTaille(
        "Petit",
      );
    describe("Décision en suspens", () => {
      describe("Infrastructure Numérique", () => {
        const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPaysPE_Infranum =
          fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPays_PE(
            "infrastructureNumerique",
          );

        const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourEtabPE_Infranum =
          fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourEtab_PE(
            "infrastructureNumerique",
          );
        const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePE_Infranum =
          fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaille_PE(
            "infrastructureNumerique",
          );

        describe("Fournisseur de réseaux de communications électroniques publics et Fournisseur de services de communications électroniques accessibles au public", () => {
          const fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPaysPEInfranum_FournisseursCommeElecPub =
            fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPaysPE_Infranum(
              "fournisseurReseauxCommunicationElectroniquesPublics",
              "fournisseurServiceCommunicationElectroniquesPublics",
            );
          it(
            "France, à minima ==> Définitivement EI",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
                fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPaysPEInfranum_FournisseursCommeElecPub(
                  arbLocalisationsServices_ContientFrance,
                ),
              ),
              fabriqueVerificationReponseDefinitivementRegule(
                TE.EntiteImportante,
              ),
            ),
          );
          it(
            "Autre(s) EM de l'UE, à minima ==> Définitivement Régulé autre",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
                fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPaysPEInfranum_FournisseursCommeElecPub(
                  arbLocalisationsServices_ContientAutreUE_SansFrance,
                ),
              ),
              fabriqueVerificationReponseDefinitivementRegule(
                TE.AutreEtatMembreUE,
              ),
            ),
          );
          it(
            "État(s) hors UE ==> Définitivement Non régulé",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
                fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourServiceDansPaysPEInfranum_FournisseursCommeElecPub(
                  arbLocalisationsServices_ContientUniquementHorsUE,
                ),
              ),
              verificationReponseNonRegule,
            ),
          );
        });
        describe("Fournisseur de services DNS, à l’exclusion des opérateurs de serveurs racines de noms de domaines ou Registres de noms de domaines de premier niveau", () => {
          it(
            "France premiere question ==> definitivement EE",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
                fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourEtabPE_Infranum(
                  "fournisseurServicesDNS",
                  "registresNomsDomainesPremierNiveau",
                )(arbLocalisationEtablissementPrincipal_France),
              ),
              fabriqueVerificationReponseDefinitivementRegule(
                TE.EntiteEssentielle,
              ),
            ),
          );
          it(
            "Autre à l'une des questions ==> definitivement Autre État Membre UE",
            assertionArbitraire(
              fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
                fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePourEtabPE_Infranum(
                  "fournisseurServicesDNS",
                  "registresNomsDomainesPremierNiveau",
                )(arbLocalisationEtablissementPrincipal_AutreUE),
              ),
              fabriqueVerificationReponseDefinitivementRegule(
                TE.AutreEtatMembreUE,
              ),
            ),
          );
        });
        it(
          "Prestataire de services de confiance qualifié ==> définitivement régulé EE",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePE_Infranum(
                "prestataireServiceConfianceQualifie",
              ) as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteEssentielle,
            ),
          ),
        );
        it(
          "Prestataire de services de confiance non qualifié ==> définitivement régulé EI",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePE_Infranum(
                "prestataireServiceConfianceNonQualifie",
              ) as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EntiteImportante,
            ),
          ),
        );
        it(
          "Fournisseur des services d’enregistrement de noms de domaine ==> Enregistrement uniquement",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePE_Infranum(
                "fournisseurServicesEnregristrementNomDomaine",
              ) as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            fabriqueVerificationReponseDefinitivementRegule(
              TE.EnregistrementUniquement,
            ),
          ),
        );
        it(
          "autre Activite Infrastructure Numerique (non listée) ==> définitivement non régulé",
          assertionArbitraire(
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePE_Infranum(
                "autreActiviteInfrastructureNumerique",
              ) as unknown as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
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
            fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
              fabriqueArbEnsInfosSecteurSingletonPourSecteurPourActivitesPourTaillePE_Infranum(
                ...activitesPENonReguleesPE,
              ) as unknown as fc.Arbitrary<ReponseInformationsSecteur<"Petit">>,
            ),
            verificationReponseNonRegule,
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
