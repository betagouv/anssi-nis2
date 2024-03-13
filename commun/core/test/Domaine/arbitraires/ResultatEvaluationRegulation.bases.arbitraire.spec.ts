import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { certains, tous } from "../../../../utils/services/sets.operations";
import { Activite } from "../../../src/Domain/Simulateur/Activite.definitions";
import {
  SecteurActivite,
  SecteurImportantsAvecBesoinLocalisationEtablissementPrincipal,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";

import { ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal } from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { estReponseEtatInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.predicats";
import {
  InformationsSecteurAvecBesoinLocalisation,
  InformationsSecteurPossible,
  InformationsSecteurSimpleListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/InformationsSecteur.definitions";
import { EtablissementPrincipalFournitUE } from "../../../src/Domain/Simulateur/services/Eligibilite/LocalisationsActivites.definitions";
import { ReponseEtatInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.definitions";
import {
  estEtablissementPrincipalFournitUE,
  estInformationSecteurAvecActivitesEssentielles,
  estSecteurBienLocaliseHorsFrance,
} from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  estSecteurImportantsAvecBesoinLocalisation,
  estSecteurListe,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { fabriqueArb_EnsActivites_AvecFiltre_PourSecteur } from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArb_ReponseInformationsSecteur_PE } from "../../utilitaires/ReponseInformationsSecteur.arbitraires.fabriques";
import { fabriqueArbInformationsSecteurAutre } from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import { assertion } from "../../utilitaires/ResultatEvaluationRegulation.assertions";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "../../utilitaires/ResultatEvaluationRegulation.tuple.arbitraire.fabrique";
import {
  arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
  arbEnsembleSecteurs_AvecBesoinLoca_NonUE,
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursSimples,
  arbEnsembleSecteursSimplesEligiblesPetit,
} from "./EnsembleInformationsSecteur.arbitraires";
import {
  arbInformationsSecteur_AvecActivitesEssentielles_Petite,
  arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
  arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
  arbInformationsSecteur_LocaliseesFrance_Grande_EI,
  arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
  arbInformationsSecteurComposite,
} from "./InformationsSecteur.arbitraires";
import {
  arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
  arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
} from "./ReponseAppartenanceUnionEuropeenne.arbitraires";
import {
  arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteurPetit,
} from "./ReponseInformationsSecteur.arbitraires";
import {
  arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
  arbSecteurAvecSousSecteurListes,
  arbSecteurImportantAvecBesoinLocalisation,
  arbSecteurNonEligiblesPetiteEntite,
} from "./SecteurActivite.arbitraires";

describe("ResultatEvaluationRegulation.bases.arbitraire", () => {
  describe("Capsules", () => {
    describe("appartenancePaysUnionEuropeenne", () => {
      it("toujours france et jamais france sont exclusifs", () =>
        assertion.tousExclusifs(
          arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
          arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
        ));
    });
    describe("InformationsSecteurPetit", () => {
      describe("arbInformationsSecteur*", () => {
        it("arbInformationsSecteurPetitAutre et arbInformationsSecteurPetit sont exclusifs", () =>
          assertion.exclusifs(
            fabriqueArbInformationsSecteurAutre("Petit"),
            arbReponseInformationsSecteurPetit,
          ));
        it("arbInformationsSecteurCompositesPetit et arbInformationsSecteurSimplesPetitNonEligibles sont exclusifs", () =>
          assertion.exclusifs(
            fabriqueArb_ReponseInformationsSecteur_PE(
              arbEnsembleSecteursComposites as fc.Arbitrary<
                Set<InformationsSecteurPossible<"Petit">>
              >,
            ),
            fabriqueArb_ReponseInformationsSecteur_PE(
              arbEnsembleSecteursSimples,
            ),
          ));
        // it("arbInformationsSecteurLocalisesFrancePetit et arbInformationsSecteurLocalisesHorsFrancePetit sont exclusifs", () =>
        //   assertion.exclusifs(
        //     arbReponseInformationsSecteurLocalisesFrancePetit,
        //     arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
        //   ));
        it("arbInformationsSecteurLocalisesHorsFrancePetit n'a jamais localisation France", () => {
          assertion.propriete(
            arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
            (capsule) => {
              [...capsule.secteurs].map((secteur) =>
                expect(secteur).toSatisfy(
                  estSecteurBienLocaliseHorsFrance<"Petit">,
                ),
              );
            },
          );
        });
        it("arbInformationsSecteurLocalisesHorsFrancePetit a toujours uniquement secteur infranum", () => {
          assertion.propriete(
            arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
            (capsule) => {
              [...capsule.secteurs].map((secteur) =>
                expect(secteur.secteurActivite).toEqual(
                  "infrastructureNumerique",
                ),
              );
            },
          );
        });
        it("arbInformationsSecteurLocalisesHorsFrancePetit a toujours uniquement des activites localisables", () => {
          assertion.propriete(
            arbReponseInformationsSecteur_LocalisesHorsUE_Petit,
            (capsule) => {
              [...capsule.secteurs].map((secteur) =>
                expect(
                  (
                    secteur as InformationsSecteurAvecBesoinLocalisation<"Petit">
                  ).activites,
                ).toSatisfy(
                  tous(
                    estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
                  ),
                ),
              );
            },
          );
        });
        describe("arbInformationsSecteurLocaliseesFranceGrandeEI", () => {
          it("contient uniquement des secteurs gestionServicesTic ou fournisseursNumeriques", () =>
            assertion.propriete(
              arbInformationsSecteur_LocaliseesFrance_Grande_EI,
              (infoSec) => {
                expect(
                  ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal.includes(
                    infoSec.secteurActivite as SecteurImportantsAvecBesoinLocalisationEtablissementPrincipal,
                  ),
                ).toBeTruthy();
                expect(infoSec.fournitServicesUnionEuropeenne).toEqual("oui");
                expect(
                  (infoSec as EtablissementPrincipalFournitUE)
                    .localisationRepresentant,
                ).toEqual("france");
                expect(infoSec.activites).toSatisfy(
                  certains(estActiviteListee),
                );
              },
            ));
        });
      });
    });
  });

  describe("bases", () => {
    describe("arbSecteurSansSousSecteur", () => {
      it("n'est pas vide", () =>
        assertion.nonVide(
          arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
        ));
      it("ne contient pas 'autre'", () =>
        assertion.neContientPas("autreSecteurActivite")(
          arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
        ));
      it("exclusif avec les secteurs localisables", () =>
        assertion.tousExclusifs(
          arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE,
          arbSecteurImportantAvecBesoinLocalisation,
        ));
    });
    describe("arbSecteurLocalisables", () => {
      it("est un secteur localisable", () =>
        assertion.propriete(
          arbSecteurImportantAvecBesoinLocalisation,
          (secteur) => {
            expect(
              ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal,
            ).includes(secteur);
          },
        ));
    });
    describe("arbSecteurAvecSousSecteur", () => {
      it("n'est pas vide", () =>
        assertion.nonVide(arbSecteurAvecSousSecteurListes));
      it("ne contient pas 'autre'", () =>
        assertion.propriete(
          arbSecteurAvecSousSecteurListes,
          ([secteur, sousSecteur]) => {
            expect(secteur).toSatisfy(estSecteurListe);
            expect(sousSecteur).toSatisfy(estSousSecteurListe);
          },
        ));
    });

    describe("arbInformationsSecteurSimple", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(
          arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE.chain(
            <
              T extends SecteurActivite,
              U extends InformationsSecteurSimpleListe,
            >(
              secteur: T,
            ): fc.Arbitrary<U> =>
              fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(
                estActiviteListee,
              )([secteur, "PasDeSousSecteurActivite"]),
          ),
        ));
      it("ne contient pas uniquement activités autre", () =>
        assertion.propriete(
          arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE.chain(
            <
              T extends SecteurActivite,
              U extends InformationsSecteurSimpleListe,
            >(
              secteur: T,
            ): fc.Arbitrary<U> =>
              fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(
                estActiviteListee,
              )([secteur, "PasDeSousSecteurActivite"]),
          ),
          (info) => {
            expect(info.activites).not.toSatisfy((activites: Set<Activite>) =>
              tous(estActiviteAutre)(activites),
            );
          },
        ));
    });
    describe("arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE", () => {
      it("contient uniquement des activites localisées", () =>
        assertion.propriete(
          arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
          (secteur) => {
            expect(secteur.activites).toSatisfy(
              tous(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation),
            );
          },
        ));
    });
    describe("arbInformationsSecteurLocaliseesHorsFrancePetite", () => {
      it("contient uniquement des activites localisées", () =>
        assertion.propriete(
          arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
          (secteur) => {
            expect(secteur.activites).toSatisfy(
              tous(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation),
            );
          },
        ));
    });
    describe("arbInformationsSecteur_AvecActivitesEssentielles_Petite", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(
          arbInformationsSecteur_AvecActivitesEssentielles_Petite,
        ));
      it("contient des données de localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteur_AvecActivitesEssentielles_Petite,
          (informationsSecteur) => {
            expect(informationsSecteur.fournitServicesUnionEuropeenne).toBe(
              "oui",
            );
            expect(informationsSecteur).toSatisfy(
              estEtablissementPrincipalFournitUE,
            );
            expect(
              (informationsSecteur as EtablissementPrincipalFournitUE)
                .localisationRepresentant,
            ).toBe("france");
          },
        ));
      it("contient uniquement des activités nécessitant localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteur_AvecActivitesEssentielles_Petite,
          (informationsSecteur) => {
            expect(
              tous(estActiviteInfrastructureNumeriqueEligiblesPetitEntite)(
                informationsSecteur.activites,
              ),
            ).toBeTruthy();
          },
        ));
    });
    describe("arbInformationsSecteurLocaliseesFranceGrandeEE", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(
          arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
        ));
      it("contient des données de localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
          (informationsSecteur) => {
            expect(informationsSecteur.fournitServicesUnionEuropeenne).toBe(
              "oui",
            );
            expect(informationsSecteur).toSatisfy(
              estEtablissementPrincipalFournitUE,
            );
            expect(
              (informationsSecteur as EtablissementPrincipalFournitUE)
                .localisationRepresentant,
            ).toBe("france");
          },
        ));
      it("contient uniquement des activités nécessitant localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE,
          (informationsSecteur) => {
            expect(
              tous(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
                informationsSecteur.activites,
              ),
            ).toBeTruthy();
          },
        ));
    });
    describe("arbInformationsSecteurLocaliseesHorsUE", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(
          arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
        ));
      it("contient des données de localisation représentant hors UE", () =>
        assertion.propriete(
          arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
          (informationsSecteur) => {
            expect(informationsSecteur.fournitServicesUnionEuropeenne).toBe(
              "non",
            );
          },
        ));
    });
    describe("arbInformationsSecteurLocaliseesHorsFrance", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE));
      it("contient des données de localisation représentant hors France", () =>
        assertion.propriete(
          arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE,
          (informationsSecteur) => {
            expect(informationsSecteur.fournitServicesUnionEuropeenne).toBe(
              "oui",
            );
            expect(informationsSecteur).toSatisfy(
              estEtablissementPrincipalFournitUE,
            );
            expect(
              (informationsSecteur as EtablissementPrincipalFournitUE)
                .localisationRepresentant,
            ).not.toBe("france");
          },
        ));
    });
    describe("arbInformationsSecteurComposite", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteurComposite));
      it("ne contient pas uniquement activités autre", () =>
        assertion.propriete(arbInformationsSecteurComposite, (info) => {
          expect(info.activites).not.toSatisfy(
            tous<Activite>(estActiviteAutre),
          );
        }));
    });
    describe("arbEnsembleSecteurs", () => {
      describe("arbEnsembleSecteursSimples", () => {
        it("ne contient pas vide", () =>
          assertion.propriete(arbEnsembleSecteursSimples, (secteur) => {
            expect(secteur).not.toContain(undefined);
          }));
        it("n'est pas vide", () =>
          assertion.nonVide(arbEnsembleSecteursSimples));
      });
      describe("arbEnsembleSecteursSimplesEligiblesPetit", () => {
        it("estInformationSecteurLocalisablePetiteEntreprise", () =>
          assertion.propriete(
            arbEnsembleSecteursSimplesEligiblesPetit,
            (ensembleSecteurs) => {
              [...ensembleSecteurs].map((secteur) =>
                expect(secteur).toSatisfy(
                  estInformationSecteurAvecActivitesEssentielles<"Petit">,
                ),
              );
            },
          ));
      });
      describe("arbEnsembleSecteursLocalisablesNonFrance", () => {
        it("ne contient que des activités essentielles localisables", () =>
          assertion.propriete(
            arbEnsembleSecteurs_AvecBesoinLoca_NonUE,
            (ensembleSecteurs) => {
              [...ensembleSecteurs].map((secteur) =>
                expect(secteur.activites).toSatisfy(
                  certains(
                    estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
                  ),
                ),
              );
            },
          ));
      });
    });
    describe("arbEnsembleSecteurs_AvecBesoinLoca_GrandEI", () => {
      it("estActiviteListee", () =>
        assertion.propriete(
          arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
          (ensembleSecteurs) => {
            [...ensembleSecteurs].map((secteur) => {
              expect(secteur.secteurActivite).toSatisfy(
                estSecteurImportantsAvecBesoinLocalisation,
              );
              expect(secteur.activites).toSatisfy(tous(estActiviteListee));
            });
          },
        ));
    });
    describe("arbSecteurNonEligiblesPetiteEntite", () => {
      it("estInformationSecteurLocalisablePetiteEntreprise", () =>
        assertion.propriete(
          arbSecteurNonEligiblesPetiteEntite,
          (ensembleSecteurs) => {
            [...ensembleSecteurs].map((secteur) =>
              expect(secteur).not.toSatisfy(
                estInformationSecteurAvecActivitesEssentielles<"Petit">,
              ),
            );
          },
        ));
    });
  });

  describe("Arbitraires cibles", () => {
    describe("arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable", () => {
      it("contient toujours une localisation fr", () => {
        assertion.propriete(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteurLocalisesFrancePetit,
          ),
          (resultat) => {
            expect(resultat).toSatisfy(estReponseEtatInformationsSecteur);

            const resultatType = resultat as ReponseEtatInformationsSecteur;
            const secteurs = [...resultatType.InformationsSecteur.secteurs];
            expect(
              secteurs.some(
                (secteur) => "fournitServicesUnionEuropeenne" in secteur,
              ),
            ).toBeTruthy();
          },
        );
      });
      it("contient uniquement des activités localisables PE", () => {
        assertion.propriete(
          fabriqueArbJamaisOse_ToujoursFrance_StructurePetit(
            arbReponseInformationsSecteurLocalisesFrancePetit,
          ),
          (resultat) => {
            expect(resultat).toSatisfy(estReponseEtatInformationsSecteur);

            const resultatType = resultat as ReponseEtatInformationsSecteur;
            const toutesActivitesEssentiellesAvecBesoinLocalisation = tous<
              InformationsSecteurAvecBesoinLocalisation<"Petit">
            >((secteur) =>
              tous(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
                secteur.activites,
              ),
            );
            expect(
              toutesActivitesEssentiellesAvecBesoinLocalisation(
                resultatType.InformationsSecteur.secteurs as Set<
                  InformationsSecteurAvecBesoinLocalisation<"Petit">
                >,
              ),
            ).toBeTruthy();
          },
        );
      });
    });
  });
});
