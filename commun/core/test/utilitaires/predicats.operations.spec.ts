import { describe, expect, it } from "vitest";
import { et, ou } from "../../../utils/services/predicats.operations";
import {
  toujoursFaux,
  toujoursVrai,
} from "../../src/Domain/Commun/Commun.predicats";

describe("Opérations logiques sur prédicats", () => {
  describe("et", () => {
    it("renvoie faux si tous les prédicats sont faux", () => {
      const validateur = et<number>(toujoursFaux, toujoursFaux, toujoursFaux);
      expect(validateur(0)).toBeFalsy();
    });
    it("renvoie faux si au moins un prédicat est faux", () => {
      const validateur = et<string>(toujoursVrai, toujoursVrai, toujoursFaux);
      expect(validateur("coucou")).toBeFalsy();
    });
    it("renvoie vrai si tous les prédicats sont vrais", () => {
      const validateur = et<string>(toujoursVrai, toujoursVrai, toujoursVrai);
      expect(validateur("coucou")).toBeTruthy();
    });
  });
  describe("ou", () => {
    it("renvoie faux si tous les prédicats sont faux", () => {
      const validateur = ou<number>(toujoursFaux, toujoursFaux, toujoursFaux);
      expect(validateur(0)).toBeFalsy();
    });
    it("renvoie vrai si au moins un prédicat est vrai", () => {
      const validateur = ou<string>(toujoursFaux, toujoursVrai, toujoursFaux);
      expect(validateur("coucou")).toBeTruthy();
    });
    it("renvoie vrai si tous les prédicats sont vrais", () => {
      const validateur = ou<string>(toujoursVrai, toujoursVrai, toujoursVrai);
      expect(validateur("coucou")).toBeTruthy();
    });
  });
});
