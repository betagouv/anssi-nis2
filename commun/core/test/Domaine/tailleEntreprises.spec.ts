import { describe, expect, it } from "vitest";
import { estPetiteEntreprise } from "../../src/Domain/Simulateur/services/TailleEntreprise/TailleEntite.predicats";

describe("Tailles entreprises", () => {
  describe(estPetiteEntreprise, () => {
    it("Est petite lorsque les 2 paramètres sont petits", () => {
      expect(estPetiteEntreprise(["petit"], ["petit"])).toBeTruthy();
    });

    it("n'est pas petite lorsque le nombre d'employés n'est pas petit", () => {
      expect(estPetiteEntreprise(["moyen"], ["petit"])).toBeFalsy();
      expect(estPetiteEntreprise(["grand"], ["petit"])).toBeFalsy();
    });

    it("n'est pas petite lorsque le chiffre d'affaires n'est pas petit", () => {
      expect(estPetiteEntreprise(["petit"], ["moyen"])).toBeFalsy();
      expect(estPetiteEntreprise(["petit"], ["grand"])).toBeFalsy();
    });
  });
});
