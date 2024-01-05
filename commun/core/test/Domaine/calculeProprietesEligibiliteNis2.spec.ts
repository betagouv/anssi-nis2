import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { IDonneesBrutesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { ResultatEligibilite } from "../../src/Domain/Simulateur/Eligibilite.definitions";
import { calculeEligibilite } from "../../src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations";
import { verifieQue } from "../utilitaires/assure";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";

const V = Object.values(Eligibilite).reduce(
  (acc, nom) => ({
    ...acc,
    [nom]: verifieQue(calculeEligibilite).renvoieToujours(Eligibilite[nom])
      .quelqueSoit,
  }),
  {}
) as Record<
  ResultatEligibilite,
  (arbitraire: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur>) => void
>;

describe(calculeEligibilite, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      V.EligiblePetiteEntreprise(arbForm.designeOSE.petit);
    });
    it("de moyenne ou grande taille est toujours éligible", () => {
      V.EligibleMoyenneGrandeEntreprise(arbForm.designeOSE.moyenGrand);
    });
  });

  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("n'est pas eligible si activites cochees sont uniquement autres", () => {
        V.NonEligible(arbForm.nonDesigneOSE.privee.activitesAutres);
      });
      describe("Petite entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
          V.EligiblePetiteEntreprise(
            arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
              .petitInfraNum.activitesConcernes
          );
        });
        it("Petit Fournisseur d'infranum dans l'UE, représentant en France", () => {
          V.EligiblePetiteEntreprise(
            arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
              .petitInfraNum.infraNumDNSOuNomDomaine.representantFrance
          );
        });
        describe("N'est pas éligible si", () => {
          it("Petit Fournisseur d'infranum dans l'UE, représentant en UE", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.infraNumDNSOuNomDomaine.representantUE
            );
          });
          it("Petit Fournisseur d'infranum ne fournissant pas dans l'UE", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.infraNumDNSOuNomDomaine.neFournitPasEnUE
            );
          });
          it("Petit Fournisseur d'infranum dans l'UE, représentant Hors UE", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.infraNumDNSOuNomDomaine.representantHorsUE
            );
          });
          it("le secteur d'activité n'est pas 'Infrastructure Numérique'", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit
                .listeNonFournisseursInfrastructureNumerique
            );
          });
          it("Le secteur d'activité est 'Infrastructure Numérique' mais les activités ne sont pas concernés", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .activitesNonConcernes
            );
          });
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          V.EligibleMoyenneGrandeEntreprise(
            arbForm.nonDesigneOSE.privee.grand.secteursListes
          );
        });
        describe("N'est pas éligible", () => {
          it("Si le secteur est 'autre'", () => {
            V.NonEligible(arbForm.nonDesigneOSE.privee.grand.secteursAutres);
          });
          it("Si l'activité est 'autre'", () => {
            V.NonEligible(arbForm.nonDesigneOSE.privee.grand.activitesAutres);
          });
        });
      });
    });
  });

  describe("Publique", () => {
    describe("est incertain pour un résultat non configuré", () => {
      it("Entité publique", () => {
        V.Incertain(arbForm.nonDesigneOSE.publique);
      });
      it("Hors Union Européenne", () => {
        V.Incertain(arbForm.nonDesigneOSE.horsUE);
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
      it("Moyen grand Gestion TIC", () => {
        V.Incertain(
          arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance
            .moyenGrandGestionTic
        );
      });
      it("Moyen grand Fournisseur Numérique", () => {
        V.Incertain(
          arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance
            .moyenGrandFournisseurNum
        );
      });
    });

    it("lorsque le type structure n'est pas remplie", () => {
      V.Incertain(arbForm.nonValide.donneeAbsente.typeStructure);
    });
    it("lorsque le type structure n'est pas remplie", () => {
      V.Incertain(arbForm.nonValide.donneeAbsente.typeStructure);
    });
    it("lorsque l'appartenance à l'UE n'est pas remplie", () => {
      V.Incertain(arbForm.nonValide.donneeAbsente.etatMembre);
    });
    it("lorsque OSE NIS 1 n'est pas rempli", () => {
      V.Incertain(
        arbForm.nonValide.donneeAbsente.designeOperateurServicesEssentiels
      );
    });
  });
});
