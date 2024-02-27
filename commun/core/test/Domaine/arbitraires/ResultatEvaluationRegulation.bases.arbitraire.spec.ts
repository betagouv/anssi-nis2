import { describe, expect, it } from "vitest";
import { tous } from "../../../../utils/services/sets.operations";
import { Activite } from "../../../src/Domain/Simulateur/Activite.definitions";

import { ValeursSecteursImportantsAvecBesoinLocalisation } from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { estReponseEtatInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.predicats";
import {
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisable,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  estEtablissementPrincipalFournitUE,
  estInformationSecteurAvecActivitesEssentielles,
  estSecteurBienLocaliseHorsFrance,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.predicats";
import { ReponseEtatInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.definitions";
import { estSecteurListe } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { assertion } from "../../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbEnsembleSecteursComposites,
  arbEnsembleSecteursLocalisablesNonFrance,
  arbEnsembleSecteursSimples,
  arbEnsembleSecteursSimplesEligiblesPetit,
} from "./EnsembleInformationsSecteur.arbitraires";
import {
  arbInformationsSecteurComposite,
  arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
  arbInformationsSecteur_AvecActivitesEssentielles_Petite,
  arbInformationsSecteurLocaliseesHorsFrancePetite,
  arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
  arbSecteurAvecSousSecteurListes,
  arbSecteurImportantsLocalisablesGrandeEntite,
  arbSecteurListesSansSousSecteurNiLocaGrand,
  arbSecteurNonEligiblesPetiteEntite,
} from "./InformationsSecteur.arbitraires";
import {
  arbReponseInformationsSecteurLocalisesFrancePetit,
  arbReponseInformationsSecteurLocalisesHorsFrancePetit,
  arbReponseInformationsSecteurPetit,
} from "./ReponseInformationsSecteur.arbitraires";
import { fabriqueArbJamaisOse_ToujoursFrance_StructurePetit } from "./ResultatEvaluationRegulation.arbitraire";
import {
  fabriqueArbInformationsSecteurAutre,
  fabriqueArbitraireCapsuleSecteurPetit,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbAppartenanceUnionEuropeenneJamaisFrance,
  arbAppartenanceUnionEuropeenneToujoursFrance,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

describe("ResultatEvaluationRegulation.bases.arbitraire", () => {
  describe("Capsules", () => {
    describe("appartenancePaysUnionEuropeenne", () => {
      it("toujours france et jamais france sont exclusifs", () =>
        assertion.tousExclusifs(
          arbAppartenanceUnionEuropeenneToujoursFrance,
          arbAppartenanceUnionEuropeenneJamaisFrance,
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
            fabriqueArbitraireCapsuleSecteurPetit(
              arbEnsembleSecteursComposites,
            ),
            fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursSimples),
          ));
        it("arbInformationsSecteurLocalisesFrancePetit et arbInformationsSecteurLocalisesHorsFrancePetit sont exclusifs", () =>
          assertion.exclusifs(
            arbReponseInformationsSecteurLocalisesFrancePetit,
            arbReponseInformationsSecteurLocalisesHorsFrancePetit,
          ));
        it("arbInformationsSecteurLocalisesHorsFrancePetit n'a jamais localisation France", () => {
          assertion.propriete(
            arbReponseInformationsSecteurLocalisesHorsFrancePetit,
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
            arbReponseInformationsSecteurLocalisesHorsFrancePetit,
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
            arbReponseInformationsSecteurLocalisesHorsFrancePetit,
            (capsule) => {
              [...capsule.secteurs].map((secteur) =>
                expect(secteur.activites).toSatisfy(
                  tous(
                    estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
                  ),
                ),
              );
            },
          );
        });
      });
    });
  });

  describe("bases", () => {
    describe("arbSecteurSansSousSecteur", () => {
      it("n'est pas vide", () =>
        assertion.nonVide(arbSecteurListesSansSousSecteurNiLocaGrand));
      it("ne contient pas 'autre'", () =>
        assertion.neContientPas("autreSecteurActivite")(
          arbSecteurListesSansSousSecteurNiLocaGrand,
        ));
      it("exclusif avec les secteurs localisables", () =>
        assertion.tousExclusifs(
          arbSecteurListesSansSousSecteurNiLocaGrand,
          arbSecteurImportantsLocalisablesGrandeEntite,
        ));
    });
    describe("arbSecteurLocalisables", () => {
      it("est un secteur localisable", () =>
        assertion.propriete(
          arbSecteurImportantsLocalisablesGrandeEntite,
          (secteur) => {
            expect(ValeursSecteursImportantsAvecBesoinLocalisation).includes(
              secteur,
            );
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
          arbSecteurListesSansSousSecteurNiLocaGrand.chain(
            fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
          ),
        ));
      it("ne contient pas uniquement activités autre", () =>
        assertion.propriete(
          arbSecteurListesSansSousSecteurNiLocaGrand.chain(
            fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
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
          arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
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
          arbInformationsSecteurLocaliseesHorsFrancePetite,
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
          arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
        ));
      it("contient des données de localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
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
          arbInformationsSecteurLocaliseesFranceGrandeInfranumEE,
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
          arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
        ));
      it("contient des données de localisation représentant hors UE", () =>
        assertion.propriete(
          arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE,
          (informationsSecteur) => {
            expect(informationsSecteur.fournitServicesUnionEuropeenne).toBe(
              "non",
            );
          },
        ));
    });
    describe("arbInformationsSecteurLocaliseesHorsFrance", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteurLocaliseesHorsFrancePetite));
      it("contient des données de localisation représentant hors France", () =>
        assertion.propriete(
          arbInformationsSecteurLocaliseesHorsFrancePetite,
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
            arbEnsembleSecteursLocalisablesNonFrance,
            (ensembleSecteurs) => {
              [...ensembleSecteurs].map((secteur) =>
                expect(secteur.activites).toSatisfy(
                  tous(
                    estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
                  ),
                ),
              );
            },
          ));
      });
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
              InformationSecteurLocalisable<"Petit">
            >((secteur) =>
              tous(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
                secteur.activites,
              ),
            );
            expect(
              toutesActivitesEssentiellesAvecBesoinLocalisation(
                resultatType.InformationsSecteur.secteurs as Set<
                  InformationSecteurLocalisable<"Petit">
                >,
              ),
            ).toBeTruthy();
          },
        );
      });
    });
  });
});
