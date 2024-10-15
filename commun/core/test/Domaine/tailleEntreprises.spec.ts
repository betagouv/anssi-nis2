import { describe, expect } from "vitest";
import { fc, it } from "@fast-check/vitest";
import { UnionPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { estPetiteEntreprise } from "../../src/Domain/Simulateur/services/TailleEntreprise/TailleEntite.predicats";

describe("Tailles entreprises", () => {
  describe(estPetiteEntreprise, () => {
    it("Est petite lorsque les 2 paramètres sont petits", () => {
      expect(estPetiteEntreprise(["petit"], ["petit"])).toBeTruthy();
    });
    it.prop([
      fc.constantFrom<UnionPetitMoyenGrand>(...ValeursPetitMoyenGrand),
      fc.constantFrom<UnionPetitMoyenGrand>("moyen", "grand"),
    ])(
      "N'est pas petite lorsque l'un des 2 n'est pas 'petit'",
      (param1, param2) => {
        expect(estPetiteEntreprise([param1], [param2])).toBeFalsy();
        expect(estPetiteEntreprise([param2], [param1])).toBeFalsy();
      },
    );
  });
});
