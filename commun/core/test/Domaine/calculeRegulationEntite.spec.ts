import { expect, describe, it } from "vitest";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import { fabriqueRegule } from "../../src/Domain/Simulateur/fabriques/Regulation.fabrique";
import { ResultatRegulationEntite } from "../../src/Domain/Simulateur/Regulation.definitions";
import { calculeRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";
import {
  carEstSecteurInfranumConcerne,
  carEstSecteurInfranumConcerneRepresentantFrance,
} from "../../src/Domain/Simulateur/services/Regulation/Regulation.predicats";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";
import { V } from "./verificationAvecRaison";

describe(calculeRegulationEntite, () => {
  describe("Régulé", () => {
    describe("Entité OSE pour NIS1", () => {
      it("petite entité", () => {
        V.estRegule(arbForm.designeOSE.petit).car({
          designeOperateurServicesEssentiels: ["oui"],
        });
      });
      it("moyenne/grande entité", () => {
        V.estRegule(arbForm.designeOSE.moyenGrand).car({
          designeOperateurServicesEssentiels: ["oui"],
        });
      });
    });

    describe("Entite non OSE pour NIS 1", () => {
      describe("Privée", () => {
        describe("Secteur Infrasctructure Numérique", () => {
          describe("petite entité", () => {
            it(`Activites toujours concernées (${ValeursActivitesConcernesInfrastructureNumerique})`, () => {
              V.estRegule(
                arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                  .petitInfraNum.activitesConcernes.uniquement,
              ).car(carEstSecteurInfranumConcerne);
            });
            it(`Activité demandant un représentant en UE (${ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement})`, () => {
              V.estRegule(
                arbForm.nonDesigneOSE.privee.petit.fournisseursInfraNum
                  .petitInfraNum.infraNumDNSOuNomDomaine.representantFrance,
              ).car(carEstSecteurInfranumConcerneRepresentantFrance);
            });
          });
        });
      });
    });
  });
  describe("NonRegulé", () => {
    describe("Privée", () => {
      it("uniquement activités autres", () => {
        V.estNonRegule(arbForm.nonDesigneOSE.privee.activitesAutres)?.car({});
      });
    });
  });
  describe("Incertain", () => {
    // it("manque données designeOperateurServicesEssentiels", () => {
    //   V.estIncertain(
    //     arbForm.nonValide.donneeAbsente.designeOperateurServicesEssentiels,
    //   );
    // });
  });

  describe("Cas à la marge", () => {
    it("Valide un secteur infranum", () => {
      const fauxCas = fabriqueDonneesFormulaire({
        typeEntitePublique: [],
        fournitServicesUnionEuropeenne: [],
        localisationRepresentant: [],
        secteurActivite: ["infrastructureNumerique"],
        sousSecteurActivite: [],
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        trancheChiffreAffaire: ["petit"],
        trancheNombreEmployes: ["petit"],
        appartenancePaysUnionEurpopeenne: ["france"],
        activites: [
          "prestataireServiceConfiance",
          "registresNomsDomainesPremierNiveau",
          "fournisseurReseauxDiffusionContenu",
        ],
      });
      expect(calculeRegulationEntite(fauxCas)).toStrictEqual(
        fabriqueRegule({
          secteurActivite: ["infrastructureNumerique"],
          activites: ["registresNomsDomainesPremierNiveau"],
        }),
      );
    });
  });

  describe("fonctions car", () => {
    describe("carEstSecteurInfranumConcerneRepresentantFrance", () => {
      it('secteurActivite: ["infrastructureNumerique"], activites: ["registresNomsDomainesPremierNiveau"],', () => {
        const cause: ResultatRegulationEntite = {
          decision: "Regule",
          causes: {
            secteurActivite: ["infrastructureNumerique"],
            activites: ["registresNomsDomainesPremierNiveau"],
          },
        };
        const estCause = carEstSecteurInfranumConcerneRepresentantFrance(cause);
        expect(estCause).toBeTruthy();
      });
    });
  });
});
