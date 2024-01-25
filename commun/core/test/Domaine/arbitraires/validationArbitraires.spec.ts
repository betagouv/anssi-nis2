import { describe, it } from "vitest";
import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { predicatDonneesFormulaire as P } from "../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { estPetiteEntreprise } from "../../../src/Domain/Simulateur/services/TailleEntreprise/TailleEntite.predicats";
import { arbForm } from "./arbitrairesSimulateur";
import { expect } from "vitest";

describe("validation des arbitraires", () => {
  describe("Entite non OSE pour NIS 1", () => {
    describe("Privée", () => {
      it("arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance.moyenGrandInfraNum", () => {
        fc.assert(
          fc.property(
            arbForm.nonDesigneOSE.privee.exceptions.etablissementPrincipalFrance
              .moyenGrandInfraNum,
            (donnees: DonneesFormulaireSimulateur) => {
              expect(donnees).toSatisfy(
                P.champs("secteurActivite").contient("infrastructureNumerique"),
              );
              expect(donnees).toSatisfy(
                P.auMoins.une.activiteListee<DonneesFormulaireSimulateur>,
              );
              expect(donnees).toSatisfy(
                P.champs("designeOperateurServicesEssentiels").est(["non"]),
              );
              expect(donnees).toSatisfy(
                P.champs("typeStructure").est(["privee"]),
              );
              expect(donnees).toSatisfy(
                P.champs("appartenancePaysUnionEurpopeenne").est(["france"]),
              );
              expect(
                estPetiteEntreprise(
                  donnees.trancheNombreEmployes,
                  donnees.trancheChiffreAffaire,
                ),
              ).toBeFalsy();
              expect(donnees.fournitServicesUnionEuropeenne).toStrictEqual([
                "oui",
              ]);
              expect(donnees.localisationRepresentant).toStrictEqual([
                "france",
              ]);
            },
          ),
          { verbose: 2 },
        );
      });
    });
  });
});
