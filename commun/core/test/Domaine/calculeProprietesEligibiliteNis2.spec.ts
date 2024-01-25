import { describe, it } from "vitest";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { calculeEligibilite } from "../../src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations";
import { verifieQue } from "../utilitaires/assure";
import { VerifieEligibilite as V } from "../utilitaires/Eligibilite.Verification";
import { AvecParams, etend } from "../utilitaires/manipulationArbitraires";
import {
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
} from "./arbitraires/arbitraireChampFormulaire";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";

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
      describe("Infrastructure Numérique", () => {
        describe("Petite entité localisée en France ou en UE", () => {
          describe("Est éligible si", () => {
            it("Est éligible si le secteur d'activité est 'Infrastructure Numérique'", () => {
              V.EligiblePetiteEntreprise(
                arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                  .petitInfraNum.activitesConcernes,
              );
            });
            it("Petit Fournisseur d'infranum dans l'UE, représentant en France", () => {
              V.EligiblePetiteEntreprise(
                arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                  .petitInfraNum.infraNumDNSOuNomDomaine.representantFrance,
              );
            });
            it("Moyen/Grand Fournisseur d'infranum dans l'UE, représentant en France", () => {
              V.EligibleMoyenneGrandeEntreprise(
                arbForm.nonDesigneOSE.privee.exceptions
                  .etablissementPrincipalFrance.moyenGrandInfraNum,
              );
            });
          });
          describe("N'est pas éligible si", () => {
            const fournitServiceUeRepresentantHorsFrance: AvecParams = {
              localisationRepresentant: arbLocalisationRepresentant.horsFrance,
              fournitServicesUnionEuropeenne:
                arbFournitServiceUnionEuropeenne.oui,
            };
            const neFournitPasServiceUe: AvecParams = {
              localisationRepresentant: arbLocalisationRepresentant.horsFrance,
              fournitServicesUnionEuropeenne:
                arbFournitServiceUnionEuropeenne.oui,
            };
            it("Moyen/Grand Fournisseur d'infranum dans l'UE, représentant hors France", () => {
              V.NonEligible(
                etend(
                  arbForm.nonDesigneOSE.privee.exceptions
                    .etablissementPrincipalFrance.moyenGrandInfraNum,
                ).avec(fournitServiceUeRepresentantHorsFrance),
              );
            });
            it("Moyen/Grand Fournisseur d'infranum fournit hors l'UE", () => {
              V.NonEligible(
                etend(
                  arbForm.nonDesigneOSE.privee.exceptions
                    .etablissementPrincipalFrance.moyenGrandInfraNum,
                ).avec(neFournitPasServiceUe),
              );
            });
          });
        });
        describe("Exceptions 'Etablissement principal en France'", () => {
          it("Moyen grand Gestion TIC", () => {
            V.EligibleMoyenneGrandeEntreprise(
              arbForm.nonDesigneOSE.privee.exceptions
                .etablissementPrincipalFrance.moyenGrandGestionTic,
            );
          });
          it("Moyen grand Fournisseur Numérique", () => {
            V.EligibleMoyenneGrandeEntreprise(
              arbForm.nonDesigneOSE.privee.exceptions
                .etablissementPrincipalFrance.moyenGrandFournisseurNum,
            );
          });
        });
        describe("N'est pas éligible si", () => {
          it("Petit Fournisseur d'infranum dans l'UE, représentant en UE", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.infraNumDNSOuNomDomaine.representantUE,
            );
          });
          it("Petit Fournisseur d'infranum ne fournissant pas dans l'UE", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.infraNumDNSOuNomDomaine.neFournitPasEnUE,
            );
          });
          it("Petit Fournisseur d'infranum dans l'UE, représentant Hors UE", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .petitInfraNum.infraNumDNSOuNomDomaine.representantHorsUE,
            );
          });
          it("le secteur d'activité n'est pas 'Infrastructure Numérique'", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit
                .listeNonFournisseursInfrastructureNumerique,
            );
          });
          it("Le secteur d'activité est 'Infrastructure Numérique' mais les activités ne sont pas concernés", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                .activitesNonConcernes,
            );
          });
        });
      });

      describe("Moyenne ou grande entité localisée en France ou en UE", () => {
        it("Est éligible si le secteur d'activité et l'activité sont listés", () => {
          V.EligibleMoyenneGrandeEntreprise(
            arbForm.nonDesigneOSE.privee.grand.secteursListes,
          );
        });
        describe("N'est pas éligible", () => {
          it("Si le secteur est 'autre'", () => {
            V.NonEligible(arbForm.nonDesigneOSE.privee.grand.secteursAutres);
          });
          it("Si l'activité est 'autre'", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.grand.activitesAutres
                .avecLocalisation,
            );
          });
          it("Si l'activité est 'autre'", () => {
            V.NonEligible(
              arbForm.nonDesigneOSE.privee.grand.activitesAutres
                .sansLocalisation,
            );
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
      it("Hors Union Européenne", () => {
        V.Incertain(arbForm.nonDesigneOSE.autrePaysUe);
      });
      it("Hors Union Européenne, grande entreprise", () => {
        verifieQue(calculeEligibilite)
          .pour({
            designeOperateurServicesEssentiels: ["non"],
            appartenancePaysUnionEurpopeenne: ["horsue"],
            typeStructure: ["privee"],
            typeEntitePublique: [],
            trancheChiffreAffaire: ["grand"],
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
    it("lorsque le type structure n'est pas remplie", () => {
      V.Incertain(arbForm.nonValide.donneeAbsente.typeStructure);
    });
    it("lorsque le type structure n'est pas remplie", () => {
      V.Incertain(arbForm.nonValide.donneeAbsente.typeStructure);
    });
    it("lorsque l'appartenance à l'UE n'est pas remplie", () => {
      V.Incertain(
        arbForm.nonValide.donneeAbsente.appartenancePaysUnionEurpopeenne,
      );
    });
    it("lorsque OSE NIS 1 n'est pas rempli", () => {
      V.Incertain(
        arbForm.nonValide.donneeAbsente.designeOperateurServicesEssentiels,
      );
    });
  });
});
