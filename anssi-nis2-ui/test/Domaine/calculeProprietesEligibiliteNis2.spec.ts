import { describe, it } from "vitest";
import { calculeEligibilite } from "../../src/Domaine/Simulateur/services/Eligibilite/Eligibilite.operations";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { verifieQue } from "../utilitaires/assure";

import { Eligibilite } from "../../src/Domaine/Simulateur/Eligibilite.constantes";

describe(calculeEligibilite, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      verifieQue(calculeEligibilite)
        .quelqueSoit(arbForm.designeOSE.petit)
        .renvoieToujours(Eligibilite.EligiblePetiteEntreprise);
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      verifieQue(calculeEligibilite)
        .quelqueSoit(arbForm.designeOSE.moyenGrand)
        .renvoieToujours(Eligibilite.EligibleMoyenneGrandeEntreprise);
    });
  });

  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("n'est pas eligible si activites cochees sont uniquement autres", () => {
        verifieQue(calculeEligibilite)
          .quelqueSoit(arbForm.nonDesigneOSE.privee.activitesAutres)
          .renvoieToujours(Eligibilite.NonEligible);
      });
      describe("Petite entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          verifieQue(calculeEligibilite)
            .quelqueSoit(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .activitesConcernes,
            )
            .renvoieToujours(Eligibilite.EligiblePetiteEntreprise);
        });
        it("Petite Infranum", () => {
          verifieQue(calculeEligibilite)
            .quelqueSoit(
              arbForm.nonDesigneOSE.privee.petit
                .fournisseursInfraNum.petitInfraNum,
            )
            .renvoieToujours(Eligibilite.Incertain);
        });
        describe("N'est pas éligible si", () => {
          it("le secteur d'activité n'est pas 'Infrastructure Numérique'", () => {
            verifieQue(calculeEligibilite)
              .quelqueSoit(
                arbForm.nonDesigneOSE.privee.petit
                  .listeNonFournisseursInfrastructureNumerique,
              )
              .renvoieToujours(Eligibilite.NonEligible);
          });
          it("Le secteur d'activité est 'Infrastructure Numérique' mais les activités ne sont pas concernés", () => {
            verifieQue(calculeEligibilite)
              .quelqueSoit(
                arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                  .activitesNonConcernes,
              )
              .renvoieToujours(Eligibilite.NonEligible);
          });
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          verifieQue(calculeEligibilite)
            .quelqueSoit(arbForm.nonDesigneOSE.privee.grand.secteursListes)
            .renvoieToujours(Eligibilite.EligibleMoyenneGrandeEntreprise);
        });
        describe("N'est pas éligible", () => {
          // Doute sur le test
          it("Si le secteur est 'autre'", () => {
            verifieQue(calculeEligibilite)
              .quelqueSoit(arbForm.nonDesigneOSE.privee.grand.secteursAutres)
              .renvoieToujours(Eligibilite.NonEligible);
          });
          it("Si l'activité est 'autre'", () => {
            verifieQue(calculeEligibilite)
              .quelqueSoit(arbForm.nonDesigneOSE.privee.grand.activitesAutres)
              .renvoieToujours(Eligibilite.NonEligible);
          });
        });
      });
    });
  });

  describe("Publique", () => {
    describe("est incertain pour un résultat non configuré", () => {
      it("Entité publique", () => {
        verifieQue(calculeEligibilite)
          .quelqueSoit(arbForm.nonDesigneOSE.publique)
          .renvoieToujours(Eligibilite.Incertain);
      });
      it("Hors Union Européenne", () => {
        verifieQue(calculeEligibilite)
          .quelqueSoit(arbForm.nonDesigneOSE.horsUE)
          .renvoieToujours(Eligibilite.Incertain);
      });
      it("Hors Union Européenne, grande entreprise", () => {
        verifieQue(calculeEligibilite)
          .pour({
            designeOperateurServicesEssentiels: ["non"],
            etatMembre: ["horsue"],
            typeStructure: ["privee"],
            typeEntitePublique: [],
            trancheCA: ["grand"],
            trancheNombreEmployes: ["grand"],
            secteurActivite: ["eauxUsees"],
            sousSecteurActivite: [],
            activites: ["collectantEvacuantTraitantEaux"],
            fournitServicesUnionEuropeenne: [],
            localisationRepresentant: [],
          })
          .renvoieToujours(Eligibilite.Incertain);
      });
    });
  });
  
  describe(Eligibilite.Incertain, () => {
    describe("Exceptions 'Etablissement principal en France'", () => {
      it("Moyen grand Infranum", () => {
        verifieQue(calculeEligibilite)
          .quelqueSoit(
            arbForm.nonDesigneOSE.privee.exceptions
              .etablissementPrincipalFrance.moyenGrandInfraNum,
          )
          .renvoieToujours(Eligibilite.Incertain);
      });
      it("Moyen grand Gestion TIC", () => {
        verifieQue(calculeEligibilite)
          .quelqueSoit(
            arbForm.nonDesigneOSE.privee.exceptions
              .etablissementPrincipalFrance.moyenGrandGestionTic,
          )
          .renvoieToujours(Eligibilite.Incertain);
      });
      it("Moyen grand Fournisseur Numérique", () => {
        verifieQue(calculeEligibilite)
          .quelqueSoit(
            arbForm.nonDesigneOSE.privee.exceptions
              .etablissementPrincipalFrance.moyenGrandFournisseurNum,
          )
          .renvoieToujours(Eligibilite.Incertain);
      });
    });

    it("lorsque le type structure n'est pas remplie", () => {
      verifieQue(calculeEligibilite)
        .quelqueSoit(arbForm.nonValide.donneeAbsente.typeStructure)
        .renvoieToujours(Eligibilite.Incertain);
    });
    it("lorsque le type structure n'est pas remplie", () => {
      verifieQue(calculeEligibilite)
        .quelqueSoit(arbForm.nonValide.donneeAbsente.typeStructure)
        .renvoieToujours(Eligibilite.Incertain);
    });
    it("lorsque l'appartenance à l'UE n'est pas remplie", () => {
      verifieQue(calculeEligibilite)
        .quelqueSoit(arbForm.nonValide.donneeAbsente.etatMembre)
        .renvoieToujours(Eligibilite.Incertain);
    });
    it("lorsque OSE NIS 1 n'est pas rempli", () => {
      verifieQue(calculeEligibilite)
        .quelqueSoit(
          arbForm.nonValide.donneeAbsente.designeOperateurServicesEssentiels,
        )
        .renvoieToujours(Eligibilite.Incertain);
    });
  });
});
