import { describe, it } from "vitest";
import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { non } from "../../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import {
  contientPetiteEntreprise,
  contientSecteurNecessitantLocalisation,
  predicatDonneesFormulaire,
  predicatDonneesFormulaire as P,
} from "../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { arbForm } from "./arbitrairesSimulateur";
import { expect } from "vitest";

const getSatisfait =
  (donnees: DonneesFormulaireSimulateur) =>
  (f: (d: DonneesFormulaireSimulateur) => boolean, m?: string) =>
    expect(donnees).toSatisfy(f, m);

describe("validation des arbitraires", () => {
  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance.moyenGrandInfraNum", () => {
        fc.assert(
          fc.property(
            arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance
              .moyenGrandInfraNum,
            (donnees: DonneesFormulaireSimulateur) => {
              const satisfait = getSatisfait(donnees);
              satisfait(
                P.auMoins.une.activiteListee<DonneesFormulaireSimulateur>,
              );
              satisfait(non(contientPetiteEntreprise));
              satisfait(P.secteurActivite.contient("infrastructureNumerique"));
              satisfait(P.designeOperateurServicesEssentiels.est(["non"]));
              satisfait(P.typeStructure.est(["privee"]));
              satisfait(P.appartenancePaysUnionEurpopeenne.est(["france"]));
              satisfait(P.fournitServicesUnionEuropeenne.est(["oui"]));
              satisfait(P.localisationRepresentant.est(["france"]));
            },
          ),
          { verbose: 2 },
        );
      });
      it("arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance.moyenGrandGestionTic", () => {
        fc.assert(
          fc.property(
            arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance
              .moyenGrandGestionTic,
            (donnees: DonneesFormulaireSimulateur) => {
              const satisfait = getSatisfait(donnees);
              satisfait(
                P.auMoins.une.activiteListee<DonneesFormulaireSimulateur>,
              );
              satisfait(non(contientPetiteEntreprise));
              satisfait(P.secteurActivite.contient("gestionServicesTic"));
              satisfait(P.designeOperateurServicesEssentiels.est(["non"]));
              satisfait(P.typeStructure.est(["privee"]));
              satisfait(P.appartenancePaysUnionEurpopeenne.est(["france"]));
              satisfait(P.fournitServicesUnionEuropeenne.est(["oui"]));
              satisfait(P.localisationRepresentant.est(["france"]));
            },
          ),
          { verbose: 2 },
        );
      });
      it("arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance.moyenGrandFournisseurNum", () => {
        fc.assert(
          fc.property(
            arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance
              .moyenGrandFournisseurNum,
            (donnees: DonneesFormulaireSimulateur) => {
              const satisfait = getSatisfait(donnees);
              satisfait(
                P.auMoins.une.activiteListee<DonneesFormulaireSimulateur>,
              );
              satisfait(non(contientPetiteEntreprise));
              satisfait(P.secteurActivite.contient("fournisseursNumeriques"));
              satisfait(P.designeOperateurServicesEssentiels.est(["non"]));
              satisfait(P.typeStructure.est(["privee"]));
              satisfait(P.appartenancePaysUnionEurpopeenne.est(["france"]));
              satisfait(P.fournitServicesUnionEuropeenne.est(["oui"]));
              satisfait(P.localisationRepresentant.est(["france"]));
            },
          ),
          { verbose: 2 },
        );
      });
      describe("arbForm.nonDesigneOSE.privee.grand.secteursListes", () => {
        it("sansBesoinLocalisation", () => {
          fc.assert(
            fc.property(
              arbForm.nonDesigneOSE.privee.grand.secteursListes
                .sansBesoinLocalisation,
              (donnees: DonneesFormulaireSimulateur) => {
                const satisfait = getSatisfait(donnees);
                satisfait(P.auMoins.une.activiteListee);
                satisfait(non(contientPetiteEntreprise));
                satisfait(non(contientSecteurNecessitantLocalisation));
                satisfait(P.designeOperateurServicesEssentiels.est(["non"]));
                satisfait(P.typeStructure.est(["privee"]));
                satisfait(P.appartenancePaysUnionEurpopeenne.est(["france"]));
              },
            ),
            { verbose: 2 },
          );
        });
        it("avecLocalisation", () => {
          fc.assert(
            fc.property(
              arbForm.nonDesigneOSE.privee.grand.secteursListes
                .avecLocalisationRepresentant,
              (donnees: DonneesFormulaireSimulateur) => {
                const satisfait = getSatisfait(donnees);
                satisfait(P.auMoins.une.activiteListee);
                satisfait(non(contientPetiteEntreprise));
                satisfait(contientSecteurNecessitantLocalisation);
                satisfait(P.designeOperateurServicesEssentiels.est(["non"]));
                satisfait(P.typeStructure.est(["privee"]));
                satisfait(P.appartenancePaysUnionEurpopeenne.est(["france"]));
                satisfait(non(P.fournitServicesUnionEuropeenne.est([])));
              },
            ),
            { verbose: 2 },
          );
        });
      });

      describe("arbForm.nonDesigneOSE.privee.activitesAutres", () => {
        it("activitesAutres", () =>
          fc.assert(
            fc.property(
              arbForm.nonDesigneOSE.privee.activitesAutres,
              (donnees: DonneesFormulaireSimulateur) => {
                const satisfait = getSatisfait(donnees);
                satisfait(P.designeOperateurServicesEssentiels.est(["non"]));
                satisfait(P.typeStructure.est(["privee"]));
                satisfait(P.appartenancePaysUnionEurpopeenne.est(["france"]));
                satisfait(predicatDonneesFormulaire.uniquement.activiteAutre);
              },
            ),
            { verbose: 2 },
          ));
      });
    });
  });
});
