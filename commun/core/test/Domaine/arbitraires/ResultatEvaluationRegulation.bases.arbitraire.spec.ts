import { describe, expect, it } from "vitest";
import { Activite } from "../../../src/Domain/Simulateur/Activite.definitions";
import { secteursNecessitantLocalisationRepresentant } from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import { estActiviteAutre } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  EtablissementPrincipalFournitUE,
  ReponseEtatInformationsSecteur,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  estEtablissementPrincipalFournitUE,
  estReponseEtatInformationsSecteur,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.predicats";
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
  arbInformationsSecteurLocalisables,
  arbInformationsSecteurPetit,
  arbInformationsSecteurPetitAutre,
  arbInformationsSecteurSimple,
  arbInformationsSecteurSimplesPetit,
  arbSecteurAvecSousSecteurListes,
  arbSecteurLocalisables,
  arbSecteurSansSousSecteur,
  arbSecteursSimples,
  arbStructurePetitPrive,
  arbStructurePetitPublic,
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
      it("arbInformationsSecteurPetitAutre et arbInformationsSecteurPetit sont exclusifs", () =>
        assertion.tousExclusifs(
          arbInformationsSecteurPetitAutre,
          arbInformationsSecteurPetit,
        ));
      it("arbInformationsSecteurPetitAutre et arbInformationsSecteurPetit sont exclusifs", () =>
        assertion.tousExclusifs(
          arbInformationsSecteurCompositesPetit,
          arbInformationsSecteurSimplesPetit,
        ));
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
          arbSecteurLocalisables,
        ));
    });
    describe("arbSecteurLocalisables", () => {
      it("est un secteur localisable", () =>
        assertion.propriete(arbSecteurLocalisables, (secteur) => {
          expect(secteursNecessitantLocalisationRepresentant).includes(secteur);
        }));
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
            [...activites].every(estActiviteAutre),
          );
        }));
    });
    describe("arbInformationsSecteurLocalisables", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteurLocalisables));
      it("contient des données de localisation représentant en France", () =>
        assertion.propriete(
          arbInformationsSecteurLocalisables,
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
    describe("arbInformationsSecteurComposite", () => {
      it("ne produit pas de structure vide", () =>
        assertion.nonVide(arbInformationsSecteurComposite));
      it("ne contient pas uniquement activités autre", () =>
        assertion.propriete(arbInformationsSecteurComposite, (info) => {
          expect(info.activites).not.toSatisfy((activites: Set<Activite>) =>
            [...activites].every(estActiviteAutre),
          );
        }));
    });

    describe("arbSecteursSimples", () => {
      it("ne contient pas vide", () =>
        assertion.propriete(arbSecteursSimples, (secteur) => {
          expect(secteur).not.includes(undefined);
        }));
      it("n'est pas vide", () => assertion.nonVide(arbSecteursSimples));
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
