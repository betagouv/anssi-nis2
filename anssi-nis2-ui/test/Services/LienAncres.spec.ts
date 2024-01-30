import { describe, expect, it } from "vitest";
import { construitAncre } from "../../../commun/utils/services/string.operations";

describe("LiensAncres", () => {
  describe("Transformation des titres", () => {
    it("titre simple", () => {
      const titre = "5. Titre court";
      const ancre = construitAncre(titre);
      expect(ancre).toEqual("#5-titre-court");
    });
    it("caractères accentués", () => {
      const titre = "àâä?/xxx"; // éèêë îï";
      const ancre = construitAncre(titre);
      const ancreAttendue = encodeURI("#àâäxxx");
      expect(ancre).toEqual(ancreAttendue);
    });
    it("titre avec de la ponctuation", () => {
      const titre =
        "4. Quel est l’objectif derrière la régulation des TPE / PME ?";
      const ancreAttendue = encodeURI(
        "#4-quel-est-lobjectif-derrière-la-régulation-des-tpe--pme-",
      );
      const ancre = construitAncre(titre);
      expect(ancre).toEqual(ancreAttendue);
    });
  });
});
