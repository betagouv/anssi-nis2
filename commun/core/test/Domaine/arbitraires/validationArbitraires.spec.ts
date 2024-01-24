import { describe, it } from "vitest";
import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { auMoinsUneActiviteListee } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
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
              expect(donnees.secteurActivite).toContain(
                "infrastructureNumerique",
              );
              expect(donnees.activites).toSatisfy(auMoinsUneActiviteListee);
              expect(donnees.designeOperateurServicesEssentiels).toStrictEqual([
                "non",
              ]);
              expect(donnees.typeStructure).toStrictEqual(["privee"]);
              expect(donnees.appartenancePaysUnionEurpopeenne).toStrictEqual([
                "france",
              ]);
              expect(
                estPetiteEntreprise(
                  donnees.trancheNombreEmployes,
                  donnees.trancheChiffreAffaire,
                ),
              ).toBeFalsy();
            },
          ),
        );
      });
    });
  });
});
