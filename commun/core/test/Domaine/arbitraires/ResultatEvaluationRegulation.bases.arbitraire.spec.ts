import { describe, expect, it } from "vitest";
import { tous } from "../../../../utils/services/sets.operations";
import { Activite } from "../../../src/Domain/Simulateur/Activite.definitions";
import { secteursNecessitantLocalisationRepresentant } from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import { estActiviteAutre } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { estReponseEtatInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.predicats";
import { EtablissementPrincipalFournitUE } from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  estEtablissementPrincipalFournitUE,
  estInformationSecteurLocalisablePetiteEntreprise,
  estSecteurBienLocaliseHorsFrancePetit,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.predicats";
import { ReponseEtatInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.definitions";
import { estSecteurListe } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { assertion } from "../../utilitaires/ResultatEvaluationRegulation.assertions";
import { arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable } from "./ResultatEvaluationRegulation.arbitraire";
import {
  arbAppartenanceUnionEuropeenneJamaisFrance,
  arbAppartenanceUnionEuropeenneToujoursFrance,
  arbDesignationOperateurServicesEssentielsJamaisOui,
  arbDesignationOperateurServicesEssentielsToujoursOui,
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositesPetit,
  arbInformationsSecteurLocaliseesFrancePetite,
  arbInformationsSecteurLocaliseesHorsFrancePetite,
  arbInformationsSecteurLocaliseesHorsUEPetite,
  arbInformationsSecteurLocalisesFrancePetit,
  arbInformationsSecteurLocalisesHorsFrancePetit,
  arbInformationsSecteurPetit,
  arbInformationsSecteurPetitAutre,
  arbInformationsSecteurSimple,
  arbInformationsSecteurSimplesPetitEligibles,
  arbInformationsSecteurSimplesPetitNonEligibles,
  arbSecteurAvecSousSecteurListes,
  arbSecteurLocalisablesGrandeEntreprise,
  arbSecteurSansSousSecteur,
  arbEnsembleSecteursSimples,
  arbStructurePetitPrive,
  arbStructurePetitPublic,
  arbEnsembleSecteursSimplesEligiblesPetit,
  arbSecteurNonEligiblesPetiteEntite,
} from "./ResultatEvaluationRegulation.bases.arbitraire";

describe("ResultatEvaluationRegulation.bases.arbitraire", () => {
  describe("Capsules", () => {
    describe("designationOperateurServicesEssentiels", () => {
      it("toujours oui et jamais oui sont exclusifs", () =>
        assertion.tousExclusifs(
          arbDesignationOperateurServicesEssentielsToujoursOui,
          arbDesignationOperateurServicesEssentielsJamaisOui,
        ));
    });
    describe("appartenancePaysUnionEuropeenne", () => {
      it("toujours france et jamais france sont exclusifs", () =>
        assertion.tousExclusifs(
          arbAppartenanceUnionEuropeenneToujoursFrance,
          arbAppartenanceUnionEuropeenneJamaisFrance,
        ));
    });
    describe("DefinitionStructurePetit", () => {
      it("petit privé et petit public sont exclusifs", () =>
        assertion.tousExclusifs(
          arbStructurePetitPrive,
          arbStructurePetitPublic,
        ));
    });
    describe("InformationsSecteurPetit", () => {
      describe("arbInformationsSecteur*", () => {
        it("arbInformationsSecteurPetitAutre et arbInformationsSecteurPetit sont exclusifs", () =>
          assertion.exclusifs(
            arbInformationsSecteurPetitAutre,
            arbInformationsSecteurPetit,
          ));
        it("arbInformationsSecteurCompositesPetit et arbInformationsSecteurSimplesPetitNonEligibles sont exclusifs", () =>
          assertion.exclusifs(
            arbInformationsSecteurCompositesPetit,
            arbInformationsSecteurSimplesPetitNonEligibles,
            // arbInformationsSecteurSimplesPetitEligibles,
          ));
        it("arbInformationsSecteurCompositesPetit et arbInformationsSecteurSimplesPetitEligibles sont exclusifs", () =>
          assertion.exclusifs(
            arbInformationsSecteurCompositesPetit,
            arbInformationsSecteurSimplesPetitEligibles,
          ));
        it("arbInformationsSecteurSimplesPetitNonEligibles et arbInformationsSecteurSimplesPetitEligibles sont exclusifs", () =>
          assertion.exclusifs(
            arbInformationsSecteurSimplesPetitNonEligibles,
            arbInformationsSecteurSimplesPetitEligibles,
          ));
        it("arbInformationsSecteurLocalisesFrancePetit et arbInformationsSecteurLocalisesHorsFrancePetit sont exclusifs", () =>
          assertion.exclusifs(
            arbInformationsSecteurLocalisesFrancePetit,
            arbInformationsSecteurLocalisesHorsFrancePetit,
          ));
        it("arbInformationsSecteurLocalisesHorsFrancePetit n'a jamais localisation France", () => {
          assertion.propriete(
            arbInformationsSecteurLocalisesHorsFrancePetit,
            (capsule) => {
              [...capsule.secteurs].map((secteur) =>
                expect(secteur).toSatisfy(
                  estSecteurBienLocaliseHorsFrancePetit,
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
      it("n'est pas vide", () => assertion.nonVide(arbSecteurSansSousSecteur));
      it("ne contient pas 'autre'", () =>
        assertion.neContientPas("autreSecteurActivite")(
          arbSecteurSansSousSecteur,
        ));
      it("exclusif avec les secteurs localisables", () =>
        assertion.tousExclusifs(
          arbSecteurSansSousSecteur,
          arbSecteurLocalisablesGrandeEntreprise,
        ));
    });
    describe("arbSecteurLocalisables", () => {
      it("est un secteur localisable", () =>
        assertion.propriete(
          arbSecteurLocalisablesGrandeEntreprise,
          (secteur) => {
            expect(secteursNecessitantLocalisationRepresentant).includes(
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
        assertion.nonVide(arbInformationsSecteurSimple));
      it("ne contient pas uniquement activités autre", () =>
        assertion.propriete(arbInformationsSecteurSimple, (info) => {
          expect(info.activites).not.toSatisfy((activites: Set<Activite>) =>
            tous(estActiviteAutre)(activites),
          );
        }));
    });
    describe("arbInformationsSecteurLocaliseesFrance", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteurLocaliseesFrancePetite));
      it("contient des données de localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteurLocaliseesFrancePetite,
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
    });
    describe("arbInformationsSecteurLocaliseesHorsUE", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteurLocaliseesHorsUEPetite));
      it("contient des données de localisation représentant hors UE", () =>
        assertion.propriete(
          arbInformationsSecteurLocaliseesHorsUEPetite,
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

    describe("arbEnsembleSecteursSimples", () => {
      it("ne contient pas vide", () =>
        assertion.propriete(arbEnsembleSecteursSimples, (secteur) => {
          expect(secteur).not.includes(undefined);
        }));
      it("n'est pas vide", () => assertion.nonVide(arbEnsembleSecteursSimples));
    });
    describe("arbEnsembleSecteursSimplesEligiblesPetit", () => {
      it("estInformationSecteurLocalisablePetiteEntreprise", () =>
        assertion.propriete(
          arbEnsembleSecteursSimplesEligiblesPetit,
          (ensembleSecteurs) => {
            [...ensembleSecteurs].map((secteur) =>
              expect(secteur).toSatisfy(
                estInformationSecteurLocalisablePetiteEntreprise,
              ),
            );
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
                estInformationSecteurLocalisablePetiteEntreprise,
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
          arbResultatEvaluationRegulationEnSuspensApresStructureLocalisable,
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
    });
  });
});
