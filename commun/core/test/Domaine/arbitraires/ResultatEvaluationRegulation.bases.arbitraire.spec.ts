import { describe, expect, it } from "vitest";
import { tous } from "../../../../utils/services/sets.operations";

import { ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal } from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { estInformationSecteurAvecActivitesEssentielles } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import {
  estSecteurImportantsAvecBesoinLocalisation,
  estSecteurListe,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { fabriqueArbInformationsSecteurAutre } from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import { assertion } from "../../utilitaires/ResultatEvaluationRegulation.assertions";
import {
  arbEnsembleSecteurs_AvecBesoinLoca_GrandEI,
  arbEnsembleSecteursSimples,
  arbEnsembleSecteursSimplesEligiblesPetit,
} from "./EnsembleInformationsSecteur.arbitraires";
import { arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE } from "./InformationsSecteur.arbitraires";
import {
  arbReponseAppartenanceUnionEuropeenne_ToujoursAutreUE,
  arbReponseAppartenanceUnionEuropeenne_ToujoursHorsUE,
} from "./ReponseAppartenanceUnionEuropeenne.arbitraires";
import { arbReponseInformationsSecteurPetit } from "./ReponseInformationsSecteur.arbitraires";
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

    describe("arbInformationsSecteurLocaliseesHorsUE", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(
          arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE,
        ));
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
});
