import { describe, expect } from "vitest";
import { it, fc } from "@fast-check/vitest";
import { UnionPetitMoyenGrand } from "../../src/Domaine/Simulateur/ChampsSimulateur";
import { ValeursPetitMoyenGrand } from "../../src/Domaine/Simulateur/ValeursChampsSimulateur";
import {
  estGrandeEntreprise,
  estMoyenneEntreprise,
  estPetiteEntreprise,
} from "../../src/Domaine/Simulateur/Operations/FiltresTailleEntite";

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
  describe(estMoyenneEntreprise, () => {
    it.prop([fc.constantFrom<UnionPetitMoyenGrand>("petit", "moyen")])(
      "vrai si aucun critère n'est grand et l'un est moyen",
      (param) => {
        expect(estMoyenneEntreprise(["moyen"], [param])).toBeTruthy();
        expect(estMoyenneEntreprise([param], ["moyen"])).toBeTruthy();
      },
    );
  });
  describe(estGrandeEntreprise, () => {
    it.prop([fc.constantFrom<UnionPetitMoyenGrand>("petit", "moyen")])(
      "vrai si l'un des critères est grand",
      (param) => {
        expect(estGrandeEntreprise(["grand"], [param])).toBeTruthy();
        expect(estGrandeEntreprise([param], ["grand"])).toBeTruthy();
      },
    );
  });
  it.prop([
    fc.constantFrom<UnionPetitMoyenGrand>(...ValeursPetitMoyenGrand),
    fc.constantFrom<UnionPetitMoyenGrand>(...ValeursPetitMoyenGrand),
  ])("L'une des categories de taille est toujours vraie", (param1, param2) => {
    const entreDansUneCategorie =
      estPetiteEntreprise([param1], [param2]) ||
      estMoyenneEntreprise([param1], [param2]) ||
      estGrandeEntreprise([param1], [param2]);
    expect(entreDansUneCategorie).toBeTruthy();
  });
});
